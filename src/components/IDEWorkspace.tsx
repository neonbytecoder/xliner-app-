/* ============================================
   Xliner — IDE Workspace Component
   ============================================ */

import { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import type {
  XlinerProject, ProjectFile, BottomPanelTab,
  BuildResult, ConsoleMessage, AIMessage, SimulatorDevice
} from '../types';
import {
  IconPlay, IconStop, IconSidebar, IconFolder, IconFolderOpen,
  IconChevronRight, IconPlus, IconTrash, IconX,
  IconTerminal, IconBug, IconWarning, IconError, IconSuccess,
  IconAI, IconSearch, IconRefresh, IconSend,
  IconRotate, IconPhone, IconTablet, IconLaptop, IconWatch,
  IconMaximize, IconMinimize, IconSettings, IconCommand,
  getFileIcon
} from '../icons';

interface IDEWorkspaceProps {
  project: XlinerProject;
  openFiles: ProjectFile[];
  activeFileId: string | null;
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  showBottomPanel: boolean;
  showPreview: boolean;
  bottomPanelTab: BottomPanelTab;
  buildResult: BuildResult;
  consoleMessages: ConsoleMessage[];
  aiMessages: AIMessage[];
  isRunning: boolean;
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onToggleBottomPanel: () => void;
  onTogglePreview: () => void;
  onSetBottomPanelTab: (tab: BottomPanelTab) => void;
  onOpenFile: (file: ProjectFile) => void;
  onCloseFile: (fileId: string) => void;
  onFileContentChange: (fileId: string, content: string) => void;
  onSave: () => void;
  onCreateFile: (parentPath: string, fileName: string) => void;
  onDeleteFile: (fileId: string) => void;
  onRenameFile: (fileId: string, newName: string) => void;
  onToggleFolder: (folderId: string) => void;
  onRun: () => void;
  onStop: () => void;
  onAIMessage: (message: string) => void;
  onBackToWelcome: () => void;
}

const deviceOptions: { id: SimulatorDevice; name: string; icon: React.ReactNode }[] = [
  { id: 'iphone-15', name: 'iPhone 15', icon: <IconPhone size={12} /> },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', icon: <IconPhone size={12} /> },
  { id: 'ipad-air', name: 'iPad Air', icon: <IconTablet size={12} /> },
  { id: 'ipad-pro', name: 'iPad Pro', icon: <IconTablet size={12} /> },
  { id: 'mac', name: 'Mac', icon: <IconLaptop size={12} /> },
  { id: 'apple-watch', name: 'Apple Watch', icon: <IconWatch size={12} /> },
];

export default function IDEWorkspace(props: IDEWorkspaceProps) {
  const {
    project, openFiles, activeFileId,
    showLeftSidebar, showRightSidebar, showBottomPanel, showPreview,
    bottomPanelTab, buildResult, consoleMessages, aiMessages, isRunning,
    onToggleLeftSidebar, onToggleRightSidebar, onToggleBottomPanel, onTogglePreview,
    onSetBottomPanelTab, onOpenFile, onCloseFile, onFileContentChange, onSave,
    onCreateFile, onDeleteFile, onRenameFile, onToggleFolder,
    onRun, onStop, onAIMessage, onBackToWelcome,
  } = props;

  const [selectedDevice, setSelectedDevice] = useState<SimulatorDevice>('iphone-15');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: ProjectFile } | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ Welcome to Xliner Terminal',
    '$ Type a command to get started...',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [inspectorTab, setInspectorTab] = useState<'properties' | 'project'>('properties');
  const [isLandscape, setIsLandscape] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const aiEndRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  const activeFile = openFiles.find(f => f.id === activeFileId);

  // Auto scroll console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleMessages]);

  // Auto scroll AI
  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent, file: ProjectFile) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  }, []);

  const handleRename = useCallback((file: ProjectFile) => {
    setRenamingId(file.id);
    setRenameValue(file.name);
  }, []);

  const handleRenameSubmit = useCallback((fileId: string) => {
    if (renameValue.trim()) {
      onRenameFile(fileId, renameValue.trim());
    }
    setRenamingId(null);
  }, [renameValue, onRenameFile]);

  const handleTerminalSubmit = useCallback(() => {
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    setTerminalHistory(prev => [...prev, `$ ${cmd}`]);

    // Simulate terminal responses
    if (cmd === 'help') {
      setTerminalHistory(prev => [...prev, 'Available commands: help, clear, ls, pwd, echo, git status, npm, node']);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
    } else if (cmd === 'ls') {
      setTerminalHistory(prev => [...prev, 'Sources/  Assets/  Resources/  Tests/  Config/  README.md']);
    } else if (cmd === 'pwd') {
      setTerminalHistory(prev => [...prev, `/Users/dev/${project.name.replace(/\s/g, '')}`]);
    } else if (cmd.startsWith('echo ')) {
      setTerminalHistory(prev => [...prev, cmd.slice(5)]);
    } else if (cmd === 'git status') {
      setTerminalHistory(prev => [...prev, 'On branch main\nChanges not staged for commit:\n  modified: Sources/ContentView.swift\n\nno changes added to commit']);
    } else if (cmd.startsWith('npm') || cmd.startsWith('node')) {
      setTerminalHistory(prev => [...prev, `[sandbox] Command "${cmd}" simulated in browser environment.`]);
    } else {
      setTerminalHistory(prev => [...prev, `zsh: command not found: ${cmd.split(' ')[0]}`]);
    }
    setTerminalInput('');
  }, [terminalInput, project.name]);

  const handleAISend = useCallback(() => {
    if (!aiInput.trim()) return;
    onAIMessage(aiInput.trim());
    setAiInput('');
  }, [aiInput, onAIMessage]);

  const getEditorLanguage = (file: ProjectFile): string => {
    if (file.language === 'swift') return 'swift';
    if (file.language === 'typescript') return 'typescript';
    if (file.language === 'javascript') return 'javascript';
    if (file.language === 'html') return 'html';
    if (file.language === 'css') return 'css';
    if (file.language === 'json') return 'json';
    if (file.language === 'markdown') return 'markdown';
    return 'plaintext';
  };

  const getDeviceFrameClass = (): string => {
    if (selectedDevice.includes('ipad')) return 'ipad';
    if (selectedDevice === 'mac') return 'mac';
    if (selectedDevice === 'apple-watch') return 'watch';
    return 'iphone';
  };

  // Render file tree
  const renderFileTree = (files: ProjectFile[], depth = 0) => {
    return files.map(file => (
      <div key={file.id}>
        <div
          className={`tree-item ${activeFileId === file.id ? 'selected' : ''}`}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
          onClick={() => file.type === 'folder' ? onToggleFolder(file.id) : onOpenFile(file)}
          onContextMenu={e => handleContextMenu(e, file)}
          id={`tree-${file.id}`}
        >
          {file.type === 'folder' && (
            <span className={`chevron ${file.isExpanded ? 'expanded' : ''}`}>
              <IconChevronRight size={10} color="var(--text-tertiary)" />
            </span>
          )}
          {file.type !== 'folder' && <span style={{ width: 14 }} />}

          <span className="file-icon">
            {file.type === 'folder'
              ? (file.isExpanded ? <IconFolderOpen size={14} color="#e8a838" /> : <IconFolder size={14} color="#e8a838" />)
              : getFileIcon(file.name)
            }
          </span>

          {renamingId === file.id ? (
            <input
              className="input input-sm"
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onBlur={() => handleRenameSubmit(file.id)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleRenameSubmit(file.id);
                if (e.key === 'Escape') setRenamingId(null);
              }}
              autoFocus
              style={{ width: 120, padding: '1px 4px', fontSize: 11 }}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className="file-name">{file.name}</span>
          )}

          {file.gitStatus && file.gitStatus !== 'none' && (
            <span className={`git-badge ${file.gitStatus}`}>
              {file.gitStatus === 'modified' ? 'M' : file.gitStatus === 'added' ? 'A' : file.gitStatus === 'deleted' ? 'D' : 'U'}
            </span>
          )}
        </div>

        {file.type === 'folder' && file.isExpanded && file.children && (
          renderFileTree(file.children, depth + 1)
        )}
      </div>
    ));
  };

  const formatTimestamp = (ts: number): string => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  const errorCount = buildResult.errors.length;
  const warningCount = buildResult.warnings.length;

  return (
    <div className="ide-workspace">
      {/* Toolbar */}
      <div className="ide-toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn" onClick={onBackToWelcome} title="Back to projects">
            <span style={{ fontSize: 14 }}>←</span>
          </button>
          <div className="toolbar-separator" />
          <button className={`toolbar-btn ${showLeftSidebar ? 'active' : ''}`} onClick={onToggleLeftSidebar} title="Toggle Navigator (⌘B)">
            <IconSidebar size={15} />
          </button>
          <div className="toolbar-separator" />
          <button className="toolbar-btn run" onClick={onRun} title="Run (⌘R)" disabled={isRunning} id="run-btn">
            <IconPlay size={14} color={isRunning ? 'var(--text-tertiary)' : 'var(--accent-green)'} />
          </button>
          <button className="toolbar-btn stop" onClick={onStop} title="Stop" disabled={!isRunning} id="stop-btn">
            <IconStop size={14} color={isRunning ? 'var(--accent-red)' : 'var(--text-tertiary)'} />
          </button>
        </div>

        <div className="toolbar-center">
          <span className="toolbar-title">{project.name}</span>
          <div className="toolbar-separator" />
          <select
            className="device-selector"
            value={selectedDevice}
            onChange={e => setSelectedDevice(e.target.value as SimulatorDevice)}
            id="device-selector"
          >
            {deviceOptions.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {buildResult.status !== 'idle' && (
            <>
              <div className="toolbar-separator" />
              <span className={`build-status ${buildResult.status}`}>
                {buildResult.status === 'building' && '⟳ Building...'}
                {buildResult.status === 'success' && '✓ Build Succeeded'}
                {buildResult.status === 'error' && '✗ Build Failed'}
              </span>
            </>
          )}
        </div>

        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={onTogglePreview} title="Toggle Preview" id="toggle-preview">
            <IconMaximize size={14} />
          </button>
          <button className={`toolbar-btn ${showRightSidebar ? 'active' : ''}`} onClick={onToggleRightSidebar} title="Toggle Inspector">
            <IconSettings size={14} />
          </button>
          <div className="toolbar-separator" />
          <button className="toolbar-btn" title="Command Palette (⌘⇧P)">
            <IconCommand size={14} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ide-content">
        {/* Left Sidebar — Navigator */}
        {showLeftSidebar && (
          <div className="ide-sidebar-left">
            <div className="navigator-header">
              <span className="navigator-title">Project</span>
              <div className="navigator-actions">
                <button
                  className="toolbar-btn"
                  title="New File"
                  onClick={() => {
                    const name = prompt('New file name:');
                    if (name && project.files[0]) {
                      // Find the Sources folder
                      const sourcesFolder = project.files[0].children?.find(f => f.name === 'Sources');
                      if (sourcesFolder) {
                        onCreateFile(sourcesFolder.path, name);
                      } else {
                        onCreateFile(project.files[0].path, name);
                      }
                    }
                  }}
                  id="new-file-btn"
                >
                  <IconPlus size={13} />
                </button>
                <button className="toolbar-btn" title="Search">
                  <IconSearch size={13} />
                </button>
              </div>
            </div>
            <div className="navigator-tree">
              {renderFileTree(project.files)}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="ide-editor-area">
          {/* Editor Tabs */}
          {openFiles.length > 0 && (
            <div className="editor-tabs">
              {openFiles.map(file => (
                <div
                  key={file.id}
                  className={`editor-tab ${activeFileId === file.id ? 'active' : ''}`}
                  onClick={() => props.onOpenFile(file)}
                  id={`tab-${file.id}`}
                >
                  {getFileIcon(file.name, 12)}
                  <span className="truncate" style={{ maxWidth: 120 }}>{file.name}</span>
                  {file.gitStatus === 'modified' && <span className="modified-dot" />}
                  <button
                    className="close-btn"
                    onClick={e => { e.stopPropagation(); onCloseFile(file.id); }}
                    title="Close"
                  >
                    <IconX size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Editor + Preview */}
          <div className="editor-container">
            {/* Code Editor */}
            <div className="editor-pane">
              {activeFile ? (
                <Editor
                  height="100%"
                  path={activeFile.id}
                  language={getEditorLanguage(activeFile)}
                  defaultValue={activeFile.content || ''}
                  onChange={value => {
                    if (debounceRef.current) window.clearTimeout(debounceRef.current);
                    debounceRef.current = window.setTimeout(() => {
                      onFileContentChange(activeFile.id, value || '');
                    }, 500);
                  }}
                  onMount={(editor, monaco) => {
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                      // Flush latest value and save immediately
                      if (debounceRef.current) window.clearTimeout(debounceRef.current);
                      onFileContentChange(activeFile.id, editor.getValue());
                      onSave();
                    });
                  }}
                  theme="vs"
                  options={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
                    minimap: { enabled: true, maxColumn: 80 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    scrollBeyondLastLine: false,
                    wordWrap: 'off',
                    tabSize: 4,
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    bracketPairColorization: { enabled: true },
                    guides: { bracketPairs: true, indentation: true },
                    padding: { top: 8 },
                    folding: true,
                    foldingStrategy: 'indentation',
                    suggest: { showKeywords: true, showSnippets: true },
                    quickSuggestions: true,
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              ) : (
                <div className="editor-empty">
                  <img src="/logo.png" alt="" />
                  <p>No file open</p>
                  <p>Open a file from the Navigator or use <kbd>⌘⇧P</kbd> for the Command Palette</p>
                </div>
              )}
            </div>

            {/* Preview Pane */}
            {showPreview && (
              <div className="preview-pane">
                <div className="preview-header">
                  <span className="preview-title">Preview</span>
                  <div className="preview-controls">
                    <button className="toolbar-btn" title="Rotate" onClick={() => setIsLandscape(!isLandscape)}>
                      <IconRotate size={13} />
                    </button>
                    <button className="toolbar-btn" title="Refresh">
                      <IconRefresh size={13} />
                    </button>
                    <button className="toolbar-btn" onClick={onTogglePreview} title="Close Preview">
                      <IconMinimize size={13} />
                    </button>
                  </div>
                </div>
                <div className="preview-content">
                  <div className={`device-frame ${getDeviceFrameClass()}`} style={isLandscape && getDeviceFrameClass() === 'iphone' ? { width: 580, height: 280 } : undefined}>
                    {getDeviceFrameClass() === 'iphone' && <div className="device-notch" />}
                    <div className="device-screen">
                      <h3 style={{ fontSize: getDeviceFrameClass() === 'watch' ? 12 : 18 }}>
                        {project.name}
                      </h3>
                      <p style={{ fontSize: getDeviceFrameClass() === 'watch' ? 9 : 13 }}>
                        Hello, World!
                      </p>
                      {getDeviceFrameClass() !== 'watch' && (
                        <button className="preview-btn">Tap Me</button>
                      )}
                    </div>
                    {getDeviceFrameClass() === 'iphone' && <div className="device-home-indicator" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar — Inspector */}
        {showRightSidebar && (
          <div className="ide-sidebar-right">
            <div className="inspector-header">
              <div className="inspector-tabs">
                <button className={`inspector-tab ${inspectorTab === 'properties' ? 'active' : ''}`} onClick={() => setInspectorTab('properties')}>
                  Properties
                </button>
                <button className={`inspector-tab ${inspectorTab === 'project' ? 'active' : ''}`} onClick={() => setInspectorTab('project')}>
                  Project
                </button>
              </div>
            </div>
            <div className="inspector-content">
              {inspectorTab === 'properties' && activeFile && (
                <>
                  <div className="inspector-section">
                    <div className="inspector-section-title">File Info</div>
                    <div className="inspector-row">
                      <label>Name</label>
                      <span>{activeFile.name}</span>
                    </div>
                    <div className="inspector-row">
                      <label>Language</label>
                      <span>{activeFile.language || 'Unknown'}</span>
                    </div>
                    <div className="inspector-row">
                      <label>Path</label>
                      <span style={{ fontSize: 9, wordBreak: 'break-all' }}>{activeFile.path}</span>
                    </div>
                    <div className="inspector-row">
                      <label>Size</label>
                      <span>{activeFile.content ? `${(new TextEncoder().encode(activeFile.content).length / 1024).toFixed(1)} KB` : '0 KB'}</span>
                    </div>
                    <div className="inspector-row">
                      <label>Lines</label>
                      <span>{activeFile.content ? activeFile.content.split('\n').length : 0}</span>
                    </div>
                    <div className="inspector-row">
                      <label>Git Status</label>
                      <span style={{ color: activeFile.gitStatus === 'modified' ? 'var(--accent-orange)' : activeFile.gitStatus === 'added' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
                        {activeFile.gitStatus || 'Clean'}
                      </span>
                    </div>
                  </div>
                </>
              )}
              {inspectorTab === 'properties' && !activeFile && (
                <div style={{ color: 'var(--text-tertiary)', fontSize: 12, textAlign: 'center', padding: 'var(--space-6)' }}>
                  Select a file to view properties.
                </div>
              )}
              {inspectorTab === 'project' && (
                <>
                  <div className="inspector-section">
                    <div className="inspector-section-title">General</div>
                    <div className="inspector-row"><label>Project</label><span>{project.name}</span></div>
                    <div className="inspector-row"><label>Bundle ID</label><span style={{ fontSize: 9 }}>{project.bundleId}</span></div>
                    <div className="inspector-row"><label>Version</label><span>{project.settings.general.version}</span></div>
                    <div className="inspector-row"><label>Build</label><span>{project.settings.general.buildNumber}</span></div>
                    <div className="inspector-row"><label>Target</label><span>{project.settings.general.deploymentTarget}</span></div>
                  </div>
                  <div className="inspector-section">
                    <div className="inspector-section-title">Build</div>
                    <div className="inspector-row"><label>Configuration</label><span>{project.settings.build.configuration}</span></div>
                    <div className="inspector-row"><label>Platform</label><span style={{ textTransform: 'capitalize' }}>{project.platform}</span></div>
                    <div className="inspector-row"><label>Interface</label><span>{project.interfaceType}</span></div>
                    <div className="inspector-row"><label>Language</label><span>{project.language}</span></div>
                  </div>
                  <div className="inspector-section">
                    <div className="inspector-section-title">AI Assistant</div>
                    <div className="inspector-row"><label>Status</label><span style={{ color: 'var(--accent-green)' }}>Ready</span></div>
                    <div className="inspector-row"><label>Provider</label><span>Built-in</span></div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel */}
      {showBottomPanel && (
        <div className="ide-bottom-panel">
          <div className="bottom-panel-tabs">
            <button className={`bottom-panel-tab ${bottomPanelTab === 'console' ? 'active' : ''}`} onClick={() => onSetBottomPanelTab('console')}>
              <IconTerminal size={12} /> Console
            </button>
            <button className={`bottom-panel-tab ${bottomPanelTab === 'problems' ? 'active' : ''}`} onClick={() => onSetBottomPanelTab('problems')}>
              <IconWarning size={12} /> Problems
              {(errorCount + warningCount) > 0 && (
                <span className="tab-badge" style={{ background: errorCount > 0 ? 'var(--accent-red)' : 'var(--accent-yellow)', color: errorCount > 0 ? 'white' : '#000' }}>
                  {errorCount + warningCount}
                </span>
              )}
            </button>
            <button className={`bottom-panel-tab ${bottomPanelTab === 'debug' ? 'active' : ''}`} onClick={() => onSetBottomPanelTab('debug')}>
              <IconBug size={12} /> Debug
            </button>
            <button className={`bottom-panel-tab ${bottomPanelTab === 'terminal' ? 'active' : ''}`} onClick={() => onSetBottomPanelTab('terminal')}>
              <IconTerminal size={12} /> Terminal
            </button>
            <button className={`bottom-panel-tab ${bottomPanelTab === 'ai' ? 'active' : ''}`} onClick={() => onSetBottomPanelTab('ai')}>
              <IconAI size={12} /> AI Assistant
            </button>
            <div style={{ flex: 1 }} />
            <button className="toolbar-btn" onClick={onToggleBottomPanel} title="Close Panel (⌘J)" style={{ marginRight: 4 }}>
              <IconX size={12} />
            </button>
          </div>

          <div className="bottom-panel-content">
            {/* Console */}
            {bottomPanelTab === 'console' && (
              <div>
                {consoleMessages.map(msg => (
                  <div key={msg.id} className={`console-line ${msg.type}`}>
                    <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                    <span>{msg.type === 'success' ? '✓' : msg.type === 'error' ? '✗' : msg.type === 'warn' ? '⚠' : 'ℹ'}</span>
                    <span>{msg.message}</span>
                  </div>
                ))}
                <div ref={consoleEndRef} />
                {consoleMessages.length === 0 && (
                  <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    No output. Run your project to see console messages.
                  </div>
                )}
              </div>
            )}

            {/* Problems */}
            {bottomPanelTab === 'problems' && (
              <div style={{ fontFamily: 'var(--font-ui)' }}>
                {buildResult.errors.map(err => (
                  <div key={err.id} className="problem-item">
                    <IconError size={14} />
                    <span style={{ color: 'var(--accent-red)' }}>{err.message}</span>
                    {err.file && <span className="file-ref">{err.file}:{err.line}</span>}
                  </div>
                ))}
                {buildResult.warnings.map(warn => (
                  <div key={warn.id} className="problem-item">
                    <IconWarning size={14} />
                    <span style={{ color: 'var(--accent-yellow)' }}>{warn.message}</span>
                    {warn.file && <span className="file-ref">{warn.file}:{warn.line}</span>}
                  </div>
                ))}
                {errorCount + warningCount === 0 && (
                  <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: 12 }}>
                    <IconSuccess size={14} color="var(--accent-green)" /> No problems detected.
                  </div>
                )}
              </div>
            )}

            {/* Debug */}
            {bottomPanelTab === 'debug' && (
              <div className="debug-panel" style={{ fontFamily: 'var(--font-ui)' }}>
                <div className="debug-controls">
                  <button title="Continue (F5)">▶</button>
                  <button title="Step Over (F10)">⤵</button>
                  <button title="Step Into (F11)">↓</button>
                  <button title="Step Out (⇧F11)">↑</button>
                  <button title="Pause">⏸</button>
                </div>
                <div className="debug-section">
                  <div className="debug-section-title">Variables</div>
                  <div className="debug-var"><span className="name">greeting</span><span className="value">"Hello, World!"</span></div>
                  <div className="debug-var"><span className="name">isLoading</span><span className="value">false</span></div>
                  <div className="debug-var"><span className="name">count</span><span className="value">0</span></div>
                </div>
                <div className="debug-section">
                  <div className="debug-section-title">Call Stack</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <div>ContentView.body.getter — ContentView.swift:8</div>
                    <div>App.body.getter — App.swift:5</div>
                    <div>main — App.swift:3</div>
                  </div>
                </div>
                <div className="debug-section">
                  <div className="debug-section-title">Breakpoints</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    No breakpoints set. Click the gutter in the editor to add breakpoints.
                  </div>
                </div>
              </div>
            )}

            {/* Terminal */}
            {bottomPanelTab === 'terminal' && (
              <div className="terminal-container">
                <div className="terminal-output">
                  {terminalHistory.map((line, i) => (
                    <div key={i} className="terminal-line">
                      {line.startsWith('$') ? (
                        <>
                          <span className="prompt">$</span>
                          {line.slice(2)}
                        </>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
                <div className="terminal-input-line">
                  <span className="prompt">$</span>
                  <input
                    className="terminal-input"
                    value={terminalInput}
                    onChange={e => setTerminalInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleTerminalSubmit(); }}
                    placeholder="Enter command..."
                    id="terminal-input"
                  />
                </div>
              </div>
            )}

            {/* AI Assistant */}
            {bottomPanelTab === 'ai' && (
              <div className="ai-container">
                <div className="ai-messages">
                  {aiMessages.map(msg => (
                    <div key={msg.id} className={`ai-message ${msg.role}`}>
                      {msg.role !== 'system' && (
                        <div className="role">{msg.role === 'user' ? 'You' : 'Xliner AI'}</div>
                      )}
                      <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                    </div>
                  ))}
                  <div ref={aiEndRef} />
                </div>
                <div className="ai-input-area">
                  <input
                    className="ai-input"
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleAISend(); }}
                    placeholder="Ask Xliner AI..."
                    id="ai-input"
                  />
                  <button className="ai-send-btn" onClick={handleAISend} title="Send" id="ai-send-btn">
                    <IconSend size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="ide-statusbar">
        <div className="statusbar-left">
          <span className="statusbar-item">
            {isRunning ? (
              <><span style={{ color: 'var(--accent-green)' }}>●</span> Running</>
            ) : (
              <><span style={{ color: 'var(--text-tertiary)' }}>●</span> Ready</>
            )}
          </span>
          {errorCount > 0 && (
            <span className="statusbar-item" style={{ color: 'var(--accent-red)' }}>
              ✗ {errorCount} {errorCount === 1 ? 'error' : 'errors'}
            </span>
          )}
          {warningCount > 0 && (
            <span className="statusbar-item" style={{ color: 'var(--accent-yellow)' }}>
              ⚠ {warningCount} {warningCount === 1 ? 'warning' : 'warnings'}
            </span>
          )}
        </div>
        <div className="statusbar-right">
          {activeFile && (
            <>
              <span className="statusbar-item">{activeFile.language}</span>
              <span className="statusbar-item">UTF-8</span>
              <span className="statusbar-item">Ln {activeFile.content?.split('\n').length || 0}</span>
            </>
          )}
          <span className="statusbar-item">Xliner 1.0.0</span>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="file-context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenu.file.type === 'folder' && (
            <>
              <button className="context-item" onClick={() => {
                const name = prompt('New file name:');
                if (name) onCreateFile(contextMenu.file.path, name);
                setContextMenu(null);
              }}>
                <IconPlus size={12} /> New File
              </button>
              <div className="context-separator" />
            </>
          )}
          <button className="context-item" onClick={() => { handleRename(contextMenu.file); setContextMenu(null); }}>
            Rename
          </button>
          <button className="context-item" onClick={() => { navigator.clipboard.writeText(contextMenu.file.path); setContextMenu(null); }}>
            Copy Path
          </button>
          <div className="context-separator" />
          <button className="context-item destructive" onClick={() => {
            if (confirm(`Delete "${contextMenu.file.name}"?`)) {
              onDeleteFile(contextMenu.file.id);
            }
            setContextMenu(null);
          }}>
            <IconTrash size={12} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
