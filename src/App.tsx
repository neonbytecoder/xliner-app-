/* ============================================
   Xliner — Main Application Component
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import type { XlinerProject, AppView, BottomPanelTab, ConsoleMessage, BuildResult, AIMessage, ProjectFile } from './types';
import { saveProject, getAllProjects, deleteProject } from './storage';
import WelcomeScreen from './components/WelcomeScreen';
import NewProjectWizard from './components/NewProjectWizard';
import IDEWorkspace from './components/IDEWorkspace';
import CommandPalette from './components/CommandPalette';
import './App.css';

function App() {
  // App state
  const [view, setView] = useState<AppView>('welcome');
  const [projects, setProjects] = useState<XlinerProject[]>([]);
  const [currentProject, setCurrentProject] = useState<XlinerProject | null>(null);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // IDE state
  const [openFiles, setOpenFiles] = useState<ProjectFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [showBottomPanel, setShowBottomPanel] = useState(true);
  const [bottomPanelTab, setBottomPanelTab] = useState<BottomPanelTab>('console');
  const [showPreview, setShowPreview] = useState(false);

  // Build state
  const [buildResult, setBuildResult] = useState<BuildResult>({ status: 'idle', errors: [], warnings: [] });
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    { id: '1', role: 'system', content: 'Welcome to Xliner AI Assistant. Ask me anything about your project — I can help with code generation, debugging, refactoring, and more.', timestamp: Date.now(), codeChanges: [] },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Load projects on mount
  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    // Attempt to resize window based on view (may be blocked by browser unless PWA standalone)
    try {
      if (view === 'welcome') {
        window.resizeTo(800, 460);
      } else {
        // For IDE or wizard, try to maximize or set to large size
        window.resizeTo(1200, 800);
      }
    } catch (e) {
      // Ignore if browser blocks resize
    }
  }, [view]);


  // Create a new project
  const handleCreateProject = useCallback(async (project: XlinerProject) => {
    await saveProject(project);
    setProjects(prev => [project, ...prev]);
    setCurrentProject(project);
    setView('ide');
    setConsoleMessages([{
      id: Date.now().toString(),
      type: 'success',
      message: `Project "${project.name}" created successfully.`,
      timestamp: Date.now(),
    }]);
    // Open the first file
    const firstFile = findFirstFile(project.files);
    if (firstFile) {
      setOpenFiles([firstFile]);
      setActiveFileId(firstFile.id);
    }
  }, []);

  // Open existing project
  const handleOpenProject = useCallback(async (project: XlinerProject) => {
    project.lastOpened = Date.now();
    await saveProject(project);
    setCurrentProject(project);
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    setView('ide');
    setConsoleMessages([{
      id: Date.now().toString(),
      type: 'info',
      message: `Opened project "${project.name}".`,
      timestamp: Date.now(),
    }]);
    const firstFile = findFirstFile(project.files);
    if (firstFile) {
      setOpenFiles([firstFile]);
      setActiveFileId(firstFile.id);
    }
  }, []);

  // Upload full folder using File System Access API
  const handleUploadFolder = useCallback(async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        alert('Folder upload is not supported in your browser.');
        return;
      }
      const dirHandle = await (window as any).showDirectoryPicker();
      
      const buildTree = async (handle: any, path: string): Promise<ProjectFile[]> => {
        const files: ProjectFile[] = [];
        for await (const entry of handle.values()) {
          const entryPath = `${path}/${entry.name}`;
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            // Only read text files to prevent crashing on binaries
            const isText = file.type.startsWith('text/') || entry.name.match(/\.(ts|js|tsx|jsx|json|md|html|css|txt|swift|c|cpp|h|hpp|py)$/);
            const content = isText ? await file.text() : '// Binary or unsupported file type';
            files.push({
              id: entryPath,
              name: entry.name,
              type: 'file',
              path: entryPath,
              content: content,
              language: entry.name.split('.').pop() || 'plaintext',
              isExpanded: false
            });
          } else if (entry.kind === 'directory') {
            files.push({
              id: entryPath,
              name: entry.name,
              type: 'folder',
              path: entryPath,
              children: await buildTree(entry, entryPath),
              isExpanded: false
            });
          }
        }
        return files.sort((a, b) => a.type === 'folder' && b.type !== 'folder' ? -1 : a.type !== 'folder' && b.type === 'folder' ? 1 : a.name.localeCompare(b.name));
      };

      const rootChildren = await buildTree(dirHandle, '');
      const rootFolder: ProjectFile = {
        id: 'root',
        name: dirHandle.name,
        type: 'folder',
        path: '',
        children: rootChildren,
        isExpanded: true
      };

      const project: XlinerProject = {
        id: Date.now().toString(),
        name: dirHandle.name,
        platform: 'crossplatform',
        template: 'empty',
        interfaceType: 'custom',
        language: 'javascript',
        orgId: 'com.xliner',
        bundleId: `com.xliner.${dirHandle.name.replace(/\s+/g, '')}`,
        createdAt: Date.now(),
        lastOpened: Date.now(),
        files: [rootFolder],
        settings: {
          general: { version: '1.0', buildNumber: '1', deploymentTarget: 'Web' },
          build: { configuration: 'debug', optimization: false },
          signing: { team: '', certificate: '' },
          ai: { provider: 'built-in', model: 'xliner-code-v1', apiKey: '', enabled: true }
        }
      };

      await saveProject(project);
      setProjects(prev => [project, ...prev]);
      setCurrentProject(project);
      setView('ide');
    } catch (err) {
      console.error('Failed to upload folder:', err);
    }
  }, []);

  // Delete project
  const handleDeleteProject = useCallback(async (id: string) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  // Open file in editor
  const handleOpenFile = useCallback((file: ProjectFile) => {
    if (file.type !== 'file') return;
    setOpenFiles(prev => {
      const exists = prev.find(f => f.id === file.id);
      if (exists) return prev;
      return [...prev, file];
    });
    setActiveFileId(file.id);
  }, []);

  // Close file tab
  const handleCloseFile = useCallback((fileId: string) => {
    setOpenFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      if (activeFileId === fileId && updated.length > 0) {
        setActiveFileId(updated[updated.length - 1].id);
      } else if (updated.length === 0) {
        setActiveFileId(null);
      }
      return updated;
    });
  }, [activeFileId]);

  // Update file content
  const handleFileContentChange = useCallback((fileId: string, content: string) => {
    if (!currentProject) return;
    const updateFiles = (files: ProjectFile[]): ProjectFile[] => {
      return files.map(f => {
        if (f.id === fileId) return { ...f, content, gitStatus: 'modified' as const };
        if (f.children) return { ...f, children: updateFiles(f.children) };
        return f;
      });
    };
    const updated = { ...currentProject, files: updateFiles(currentProject.files) };
    setCurrentProject(updated);
    setOpenFiles(prev => prev.map(f => f.id === fileId ? { ...f, content, gitStatus: 'modified' as const } : f));
    saveProject(updated);
  }, [currentProject]);

  const handleSave = useCallback(async () => {
    if (!currentProject) return;
    
    // Clear the gitStatus 'modified' flag from all files
    const clearModified = (files: ProjectFile[]): ProjectFile[] => {
      return files.map(f => {
        const newFile = { ...f };
        if (newFile.gitStatus === 'modified') {
          delete newFile.gitStatus;
        }
        if (newFile.children) {
          newFile.children = clearModified(newFile.children);
        }
        return newFile;
      });
    };
    
    const updated = { ...currentProject, files: clearModified(currentProject.files) };
    
    // Save to IndexedDB
    await saveProject(updated);
    
    // Update State
    setCurrentProject(updated);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
    
    setConsoleMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'info',
      message: 'Project saved successfully.',
      timestamp: Date.now()
    }]);
  }, [currentProject]);

  // Create new file
  const handleCreateFile = useCallback((parentPath: string, fileName: string) => {
    if (!currentProject) return;
    const newFile: ProjectFile = {
      id: Math.random().toString(36).substring(2),
      name: fileName,
      path: `${parentPath}/${fileName}`,
      type: 'file',
      content: '',
      language: fileName.endsWith('.swift') ? 'swift' : fileName.endsWith('.ts') || fileName.endsWith('.tsx') ? 'typescript' : fileName.endsWith('.js') || fileName.endsWith('.jsx') ? 'javascript' : fileName.endsWith('.html') ? 'html' : fileName.endsWith('.css') ? 'css' : 'plaintext',
      gitStatus: 'added',
    };
    const addToFolder = (files: ProjectFile[]): ProjectFile[] => {
      return files.map(f => {
        if (f.path === parentPath && f.type === 'folder') {
          return { ...f, children: [...(f.children || []), newFile], isExpanded: true };
        }
        if (f.children) return { ...f, children: addToFolder(f.children) };
        return f;
      });
    };
    const updated = { ...currentProject, files: addToFolder(currentProject.files) };
    setCurrentProject(updated);
    saveProject(updated);
    handleOpenFile(newFile);
    addConsoleMessage('success', `Created file: ${fileName}`);
  }, [currentProject, handleOpenFile]);

  // Delete file
  const handleDeleteFile = useCallback((fileId: string) => {
    if (!currentProject) return;
    const removeFile = (files: ProjectFile[]): ProjectFile[] => {
      return files.filter(f => f.id !== fileId).map(f => {
        if (f.children) return { ...f, children: removeFile(f.children) };
        return f;
      });
    };
    const updated = { ...currentProject, files: removeFile(currentProject.files) };
    setCurrentProject(updated);
    saveProject(updated);
    handleCloseFile(fileId);
    addConsoleMessage('info', 'File deleted.');
  }, [currentProject, handleCloseFile]);

  // Rename file
  const handleRenameFile = useCallback((fileId: string, newName: string) => {
    if (!currentProject) return;
    const renameInFiles = (files: ProjectFile[]): ProjectFile[] => {
      return files.map(f => {
        if (f.id === fileId) {
          const parts = f.path.split('/');
          parts[parts.length - 1] = newName;
          return { ...f, name: newName, path: parts.join('/') };
        }
        if (f.children) return { ...f, children: renameInFiles(f.children) };
        return f;
      });
    };
    const updated = { ...currentProject, files: renameInFiles(currentProject.files) };
    setCurrentProject(updated);
    setOpenFiles(prev => prev.map(f => f.id === fileId ? { ...f, name: newName } : f));
    saveProject(updated);
  }, [currentProject]);

  // Toggle folder
  const handleToggleFolder = useCallback((folderId: string) => {
    if (!currentProject) return;
    const toggle = (files: ProjectFile[]): ProjectFile[] => {
      return files.map(f => {
        if (f.id === folderId) return { ...f, isExpanded: !f.isExpanded };
        if (f.children) return { ...f, children: toggle(f.children) };
        return f;
      });
    };
    setCurrentProject(prev => prev ? { ...prev, files: toggle(prev.files) } : null);
  }, [currentProject]);

  // Console
  const addConsoleMessage = useCallback((type: ConsoleMessage['type'], message: string) => {
    setConsoleMessages(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      type,
      message,
      timestamp: Date.now(),
    }]);
  }, []);

  // Run project
  const handleRun = useCallback(() => {
    if (!currentProject) return;
    setIsRunning(true);
    setBuildResult({ status: 'building', errors: [], warnings: [] });
    addConsoleMessage('info', 'Building project...');
    setShowBottomPanel(true);
    setBottomPanelTab('console');

    // Simulate build process
    setTimeout(() => {
      addConsoleMessage('info', 'Compiling sources...');
    }, 300);
    setTimeout(() => {
      addConsoleMessage('info', 'Resolving dependencies...');
    }, 700);
    setTimeout(() => {
      addConsoleMessage('info', 'Linking...');
    }, 1100);
    setTimeout(() => {
      const hasErrors = false; // always succeed for demo
      if (hasErrors) {
        setBuildResult({
          status: 'error',
          startTime: Date.now() - 2000,
          endTime: Date.now(),
          errors: [{ id: '1', type: 'error', message: 'Build failed', file: 'App.swift', line: 5 }],
          warnings: [],
        });
        addConsoleMessage('error', 'Build Failed — 1 error');
        setIsRunning(false);
      } else {
        setBuildResult({
          status: 'success',
          startTime: Date.now() - 2000,
          endTime: Date.now(),
          errors: [],
          warnings: [{ id: 'w1', type: 'warning', message: 'Unused variable \'temp\'', file: 'ContentView.swift', line: 12 }],
        });
        addConsoleMessage('success', `Build Succeeded — ${((Date.now() - (Date.now() - 2000)) / 1000).toFixed(1)}s`);
        addConsoleMessage('info', 'Launching preview...');
        setShowPreview(true);
        setTimeout(() => {
          addConsoleMessage('success', 'Preview started successfully.');
        }, 500);
      }
    }, 1800);
  }, [currentProject, addConsoleMessage]);

  // Stop project
  const handleStop = useCallback(() => {
    setIsRunning(false);
    setShowPreview(false);
    setBuildResult({ status: 'idle', errors: [], warnings: [] });
    addConsoleMessage('info', 'Preview stopped.');
  }, [addConsoleMessage]);

  // AI chat
  const handleAIMessage = useCallback((message: string) => {
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    setAiMessages(prev => [...prev, userMsg]);

    // Simulated AI response
    setTimeout(() => {
      let response = '';
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes('login') || lowerMsg.includes('auth')) {
        response = 'I can help you create a login screen. Here\'s what I recommend:\n\n1. Create a new `LoginView.swift` file\n2. Add email and password fields\n3. Implement form validation\n4. Add authentication logic\n\nWould you like me to generate the code?';
      } else if (lowerMsg.includes('bug') || lowerMsg.includes('error') || lowerMsg.includes('fix')) {
        response = 'I\'ll analyze your code for potential issues. Let me review the current file...\n\nI found a few potential improvements:\n- Consider adding error handling for network calls\n- The variable naming could be more descriptive\n- There\'s a potential memory leak in the observer pattern\n\nShould I apply these fixes?';
      } else if (lowerMsg.includes('test')) {
        response = 'I\'ll generate unit tests for your current file. Here\'s what I\'d create:\n\n```swift\nfunc testContentViewLoads() {\n    let view = ContentView()\n    XCTAssertNotNil(view)\n}\n```\n\nWant me to create the test file?';
      } else {
        response = `I understand your request about "${message}". Here are my suggestions:\n\n1. **Code Analysis** — I can review your project structure and suggest improvements\n2. **Generation** — I can create new components, views, or utilities\n3. **Refactoring** — I can help reorganize and optimize your code\n4. **Documentation** — I can generate documentation for your codebase\n\nWhat would you like me to focus on?`;
      }

      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setAiMessages(prev => [...prev, aiMsg]);
    }, 1500);
  }, []);

  // Go back to welcome
  const handleBackToWelcome = useCallback(() => {
    setView('welcome');
    setCurrentProject(null);
    setOpenFiles([]);
    setActiveFileId(null);
    setConsoleMessages([]);
    setBuildResult({ status: 'idle', errors: [], warnings: [] });
    setIsRunning(false);
    setShowPreview(false);
  }, []);

  // Command palette action
  const handleCommandAction = useCallback((action: string) => {
    setShowCommandPalette(false);
    switch (action) {
      case 'new-file':
        if (currentProject?.files[0]) {
          const name = prompt('Enter file name:');
          if (name) handleCreateFile(currentProject.files[0].path, name);
        }
        break;
      case 'run':
        handleRun();
        break;
      case 'stop':
        handleStop();
        break;
      case 'toggle-preview':
        setShowPreview(v => !v);
        break;
      case 'toggle-sidebar':
        setShowLeftSidebar(v => !v);
        break;
      case 'toggle-inspector':
        setShowRightSidebar(v => !v);
        break;
      case 'toggle-terminal':
        setShowBottomPanel(true);
        setBottomPanelTab('terminal');
        break;
      case 'open-ai':
        setShowBottomPanel(true);
        setBottomPanelTab('ai');
        break;
      case 'settings':
        setShowRightSidebar(true);
        break;
      case 'back-to-welcome':
        handleBackToWelcome();
        break;
    }
  }, [currentProject, handleCreateFile, handleRun, handleStop, handleBackToWelcome]);
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'p') {
        e.preventDefault();
        setShowCommandPalette(v => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setShowLeftSidebar(v => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setShowBottomPanel(v => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        if (currentProject) handleRun();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (currentProject) handleSave();
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject, handleSave, handleRun]);


  return (
    <div className="xliner-app">
      {view === 'welcome' && (
        <WelcomeScreen
          projects={projects}
          onCreateNew={() => setView('new-project')}
          onOpenProject={handleOpenProject}
          onDeleteProject={handleDeleteProject}
          onUploadFolder={handleUploadFolder}
        />
      )}

      {view === 'new-project' && (
        <NewProjectWizard
          onBack={() => setView('welcome')}
          onCreate={handleCreateProject}
        />
      )}

      {view === 'ide' && currentProject && (
        <IDEWorkspace
          project={currentProject}
          openFiles={openFiles}
          activeFileId={activeFileId}
          showLeftSidebar={showLeftSidebar}
          showRightSidebar={showRightSidebar}
          showBottomPanel={showBottomPanel}
          showPreview={showPreview}
          bottomPanelTab={bottomPanelTab}
          buildResult={buildResult}
          consoleMessages={consoleMessages}
          aiMessages={aiMessages}
          isRunning={isRunning}
          onToggleLeftSidebar={() => setShowLeftSidebar(v => !v)}
          onToggleRightSidebar={() => setShowRightSidebar(v => !v)}
          onToggleBottomPanel={() => setShowBottomPanel(v => !v)}
          onTogglePreview={() => setShowPreview(v => !v)}
          onSetBottomPanelTab={setBottomPanelTab}
          onOpenFile={handleOpenFile}
          onCloseFile={handleCloseFile}
          onFileContentChange={handleFileContentChange}
          onSave={handleSave}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          onRenameFile={handleRenameFile}
          onToggleFolder={handleToggleFolder}
          onRun={handleRun}
          onStop={handleStop}
          onAIMessage={handleAIMessage}
          onBackToWelcome={handleBackToWelcome}
        />
      )}

      {showCommandPalette && (
        <CommandPalette
          onClose={() => setShowCommandPalette(false)}
          onAction={handleCommandAction}
        />
      )}
    </div>
  );
}

// Helper: find first source file in tree
function findFirstFile(files: ProjectFile[]): ProjectFile | null {
  for (const file of files) {
    if (file.type === 'file' && (file.name.endsWith('.swift') || file.name.endsWith('.ts') || file.name.endsWith('.js') || file.name.endsWith('.html'))) {
      return file;
    }
    if (file.children) {
      const found = findFirstFile(file.children);
      if (found) return found;
    }
  }
  return null;
}

export default App;
