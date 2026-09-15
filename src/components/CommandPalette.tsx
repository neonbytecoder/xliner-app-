/* ============================================
   Xliner — Command Palette Component
   ============================================ */

import { useState, useEffect, useRef } from 'react';

interface CommandPaletteProps {
  onClose: () => void;
  onAction: (action: string) => void;
}

const commands = [
  { id: 'new-file', label: 'Create New File', shortcut: '⌘N', category: 'File' },
  { id: 'run', label: 'Run Project', shortcut: '⌘R', category: 'Build' },
  { id: 'stop', label: 'Stop Project', shortcut: '⌘.', category: 'Build' },
  { id: 'toggle-preview', label: 'Toggle Preview', shortcut: '⌘P', category: 'View' },
  { id: 'toggle-sidebar', label: 'Toggle Navigator', shortcut: '⌘B', category: 'View' },
  { id: 'toggle-inspector', label: 'Toggle Inspector', shortcut: '⌘I', category: 'View' },
  { id: 'toggle-terminal', label: 'Open Terminal', shortcut: '⌘`', category: 'View' },
  { id: 'open-ai', label: 'Open AI Assistant', shortcut: '', category: 'AI' },
  { id: 'settings', label: 'Project Settings', shortcut: '⌘,', category: 'Project' },
  { id: 'format-code', label: 'Format Document', shortcut: '⇧⌥F', category: 'Edit' },
  { id: 'find-in-files', label: 'Find in Files', shortcut: '⌘⇧F', category: 'Edit' },
  { id: 'git-commit', label: 'Git Commit', shortcut: '', category: 'Git' },
  { id: 'back-to-welcome', label: 'Back to Projects', shortcut: '', category: 'Navigation' },
];

export default function CommandPalette({ onClose, onAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      onAction(filtered[selectedIndex].id);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="command-palette-overlay" onClick={onClose} id="command-palette-overlay">
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="command-palette-input">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Commands..."
            id="command-palette-search"
          />
        </div>
        <div className="command-palette-list">
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              className="command-item"
              style={i === selectedIndex ? { background: 'var(--bg-selected)' } : undefined}
              onClick={() => onAction(cmd.id)}
              onMouseEnter={() => setSelectedIndex(i)}
              id={`cmd-${cmd.id}`}
            >
              <div>
                <span style={{ color: 'var(--text-tertiary)', fontSize: 10, marginRight: 8 }}>{cmd.category}</span>
                <span>{cmd.label}</span>
              </div>
              {cmd.shortcut && <span className="shortcut">{cmd.shortcut}</span>}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 'var(--space-5)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 12 }}>
              No matching commands
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
