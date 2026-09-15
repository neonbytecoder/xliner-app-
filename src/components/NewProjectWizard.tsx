/* ============================================
   Xliner — New Project Wizard Component
   ============================================ */

import { useState } from 'react';
import type { XlinerProject, Platform, Template, InterfaceType, ProjectLanguage } from '../types';
import { createProject } from '../templates';
import { IconX, IconPhone, IconTablet, IconLaptop, IconWatch, IconTV, IconVision } from '../icons';

interface NewProjectWizardProps {
  onBack: () => void;
  onCreate: (project: XlinerProject) => void;
}

const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: 'ios', label: 'iOS', icon: <IconPhone size={20} /> },
  { id: 'ipados', label: 'iPadOS', icon: <IconTablet size={20} /> },
  { id: 'macos', label: 'macOS', icon: <IconLaptop size={20} /> },
  { id: 'watchos', label: 'watchOS', icon: <IconWatch size={20} /> },
  { id: 'tvos', label: 'tvOS', icon: <IconTV size={20} /> },
  { id: 'visionos', label: 'visionOS', icon: <IconVision size={20} /> },
  { id: 'web', label: 'Web', icon: <span style={{ fontSize: 18 }}>🌐</span> },
  { id: 'crossplatform', label: 'Cross-platform', icon: <span style={{ fontSize: 18 }}>⊕</span> },
];

const templates: { id: Template; label: string; icon: string; desc: string }[] = [
  { id: 'app', label: 'App', icon: '📱', desc: 'Application' },
  { id: 'game', label: 'Game', icon: '🎮', desc: 'Game project' },
  { id: 'utility', label: 'Utility', icon: '🔧', desc: 'Utility tool' },
  { id: 'productivity', label: 'Productivity', icon: '📊', desc: 'Productivity' },
  { id: 'webapp', label: 'Web App', icon: '🌐', desc: 'Web application' },
  { id: 'dashboard', label: 'Dashboard', icon: '📈', desc: 'Dashboard UI' },
  { id: 'ai-app', label: 'AI Application', icon: '🤖', desc: 'AI-powered' },
  { id: 'api-client', label: 'API Client', icon: '🔗', desc: 'API consumer' },
  { id: 'empty', label: 'Empty', icon: '📄', desc: 'Blank project' },
];

export default function NewProjectWizard({ onBack, onCreate }: NewProjectWizardProps) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform>('ios');
  const [template, setTemplate] = useState<Template>('app');
  const [productName, setProductName] = useState('My First App');
  const [orgId, setOrgId] = useState('com.example');
  const [interfaceType, setInterfaceType] = useState<InterfaceType>('swiftui');
  const [language, setLanguage] = useState<ProjectLanguage>('swift');

  const bundleId = `${orgId}.${productName.replace(/\s+/g, '')}`;

  const handleCreate = () => {
    if (!productName.trim()) return;
    const project = createProject(productName, orgId, platform, template, interfaceType, language);
    onCreate(project);
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard animate-slide-up">
        {/* Header */}
        <div className="wizard-header">
          <h2>{step === 1 ? 'Choose a template for your new project' : 'Configure your new project'}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div className="wizard-steps">
              <div className={`wizard-step-indicator ${step === 1 ? 'active' : 'completed'}`}>
                <div className="wizard-step-dot" />
                <span>Template</span>
              </div>
              <div className="wizard-step-line" />
              <div className={`wizard-step-indicator ${step === 2 ? 'active' : ''}`}>
                <div className="wizard-step-dot" />
                <span>Configure</span>
              </div>
            </div>
            <button className="toolbar-btn" onClick={onBack} title="Close">
              <IconX size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="wizard-body">
          {step === 1 && (
            <>
              {/* Platform Selection */}
              <div className="wizard-section">
                <div className="wizard-section-title">Platform</div>
                <div className="platform-grid">
                  {platforms.map(p => (
                    <button
                      key={p.id}
                      className={`platform-btn ${platform === p.id ? 'selected' : ''}`}
                      onClick={() => setPlatform(p.id)}
                      id={`platform-${p.id}`}
                    >
                      {p.icon}
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              <div className="wizard-section">
                <div className="wizard-section-title">Template</div>
                <div className="template-grid">
                  {templates.map(t => (
                    <div
                      key={t.id}
                      className={`template-card ${template === t.id ? 'selected' : ''}`}
                      onClick={() => setTemplate(t.id)}
                      id={`template-${t.id}`}
                    >
                      <div className="template-card-icon">{t.icon}</div>
                      <div className="template-card-name">{t.label}</div>
                      <div className="template-card-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  className="input"
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="My First App"
                  id="product-name-input"
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Organization Identifier</label>
                  <input
                    className="input"
                    type="text"
                    value={orgId}
                    onChange={e => setOrgId(e.target.value)}
                    placeholder="com.example"
                    id="org-id-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bundle Identifier</label>
                  <input
                    className="input"
                    type="text"
                    value={bundleId}
                    readOnly
                    style={{ opacity: 0.7 }}
                    id="bundle-id-display"
                  />
                  <div className="form-hint">Auto-generated</div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Interface</label>
                  <select
                    className="input select"
                    value={interfaceType}
                    onChange={e => setInterfaceType(e.target.value as InterfaceType)}
                    id="interface-select"
                  >
                    <option value="swiftui">SwiftUI</option>
                    <option value="uikit">UIKit</option>
                    <option value="webui">Web UI</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <select
                    className="input select"
                    value={language}
                    onChange={e => setLanguage(e.target.value as ProjectLanguage)}
                    id="language-select"
                  >
                    <option value="swift">Swift</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input type="checkbox" defaultChecked id="git-init-check" />
                  Initialize Git repository
                </label>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input type="checkbox" defaultChecked id="readme-check" />
                  Generate README
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="wizard-footer">
          <button className="btn" onClick={step === 1 ? onBack : () => setStep(1)} id="wizard-back-btn">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {step === 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(2)} id="wizard-next-btn">
                Next
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleCreate} id="wizard-create-btn">
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
