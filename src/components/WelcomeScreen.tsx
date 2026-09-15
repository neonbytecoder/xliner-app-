/* ============================================
   Xliner — Welcome Screen Component
   ============================================ */

import { useState } from 'react';
import type { XlinerProject } from '../types';
import { IconPlus, IconFolder, IconSearch, IconTrash } from '../icons';

interface WelcomeScreenProps {
  projects: XlinerProject[];
  onCreateNew: () => void;
  onOpenProject: (project: XlinerProject) => void;
  onDeleteProject: (id: string) => void;
  onUploadFolder?: () => void;
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

function getPlatformLabel(platform: string): string {
  const labels: Record<string, string> = {
    ios: 'iOS',
    ipados: 'iPadOS',
    macos: 'macOS',
    watchos: 'watchOS',
    tvos: 'tvOS',
    visionos: 'visionOS',
    web: 'Web',
    crossplatform: 'Cross-platform',
  };
  return labels[platform] || platform;
}

export default function WelcomeScreen({ projects, onCreateNew, onOpenProject, onDeleteProject, onUploadFolder }: WelcomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.lastOpened - a.lastOpened);

  return (
    <div className="welcome-screen animate-fade-in" style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)' }}>
      {/* Left Sidebar (White) */}
      <div className="welcome-sidebar" style={{ width: 400, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', position: 'relative', borderRight: '1px solid var(--border-primary)' }}>
        
        {/* Window Controls (Close Button) */}
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <button 
            onClick={() => window.close()} 
            style={{ 
              width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56', border: '1px solid #e0443e',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
            }}
            title="Close"
          >
            <span style={{ fontSize: 8, opacity: 0 }} className="window-close-icon">✕</span>
          </button>
        </div>

        <div className="welcome-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60, marginBottom: 40 }}>
          <img src="/logo.png" alt="Xliner" style={{ width: 128, height: 128, borderRadius: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 24, marginBottom: 4 }}>Xliner</h1>
          <div className="welcome-version" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Version 1.0.0</div>
        </div>

        <div className="welcome-actions" style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="welcome-action-btn" onClick={onCreateNew} id="create-new-project" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: 'var(--bg-hover)', border: 'none', borderRadius: 8, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <div className="icon-wrapper" style={{ color: 'var(--text-secondary)' }}>
              <IconPlus size={16} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>Create a new Xliner project</div>
          </button>

          <button className="welcome-action-btn" id="open-existing-project" onClick={onUploadFolder} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: 'var(--bg-hover)', border: 'none', borderRadius: 8, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <div className="icon-wrapper" style={{ color: 'var(--text-secondary)' }}>
              <IconFolder size={16} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>Open Existing Project</div>
          </button>
        </div>
      </div>

      {/* Main Content (Light Gray) */}
      <div className="welcome-main" style={{ flex: 1, backgroundColor: '#f5f5f7', display: 'flex', flexDirection: 'column', padding: 40, overflow: 'auto' }}>
        
        {projects.length > 0 && (
          <div className="welcome-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Recent Projects</h2>
            <div className="welcome-search" style={{ position: 'relative' }}>
              <span className="search-icon" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <IconSearch size={12} color="var(--text-secondary)" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                id="project-search"
                style={{ padding: '6px 12px 6px 26px', fontSize: 12, border: '1px solid var(--border-secondary)', borderRadius: 6, backgroundColor: '#ffffff', width: 200 }}
              />
            </div>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="welcome-empty" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: 16 }}>
            {searchQuery ? 'No projects match your search.' : 'No Recent Projects'}
          </div>
        ) : (
          <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="project-list-item"
                onClick={() => onOpenProject(project)}
                id={`project-${project.id}`}
                style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: '#ffffff', borderRadius: 8, cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-focus)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div className="project-card-icon" style={{ width: 40, height: 40, backgroundColor: 'var(--bg-hover)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--accent-blue)', marginRight: 16 }}>
                  {project.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="project-card-name" style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{project.name}</div>
                  <div className="project-card-platform" style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {getPlatformLabel(project.platform)} · {project.template}
                  </div>
                </div>
                <div className="project-card-meta" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="project-card-time" style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {formatTimeAgo(project.lastOpened)}
                  </span>
                  <button
                    className="project-card-delete"
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm(`Delete "${project.name}"?`)) {
                        onDeleteProject(project.id);
                      }
                    }}
                    title="Delete project"
                    style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 4 }}
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
