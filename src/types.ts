/* ============================================
   Xliner — Type Definitions
   ============================================ */

export interface XlinerProject {
  id: string;
  name: string;
  bundleId: string;
  orgId: string;
  platform: Platform;
  template: Template;
  interfaceType: InterfaceType;
  language: ProjectLanguage;
  createdAt: number;
  lastOpened: number;
  files: ProjectFile[];
  settings: ProjectSettings;
}

export type Platform = 'ios' | 'ipados' | 'macos' | 'watchos' | 'tvos' | 'visionos' | 'web' | 'crossplatform';

export type Template = 'app' | 'game' | 'utility' | 'productivity' | 'webapp' | 'dashboard' | 'ai-app' | 'api-client' | 'empty';

export type InterfaceType = 'swiftui' | 'uikit' | 'webui' | 'custom';

export type ProjectLanguage = 'swift' | 'javascript' | 'typescript';

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: ProjectFile[];
  isExpanded?: boolean;
  gitStatus?: 'modified' | 'added' | 'deleted' | 'untracked' | 'none';
}

export interface ProjectSettings {
  general: {
    version: string;
    buildNumber: string;
    deploymentTarget: string;
  };
  build: {
    configuration: 'debug' | 'release';
    optimization: boolean;
  };
  signing: {
    team: string;
    certificate: string;
  };
  ai: {
    provider: string;
    model: string;
    apiKey: string;
    enabled: boolean;
  };
}

export type SimulatorDevice = 'iphone-15' | 'iphone-15-pro' | 'iphone-15-pro-max' | 'ipad-air' | 'ipad-pro' | 'mac' | 'apple-watch' | 'apple-tv' | 'vision-pro';

export interface DeviceInfo {
  id: SimulatorDevice;
  name: string;
  width: number;
  height: number;
  category: string;
  icon: string;
}

export interface BuildResult {
  status: 'idle' | 'building' | 'success' | 'error';
  startTime?: number;
  endTime?: number;
  errors: BuildMessage[];
  warnings: BuildMessage[];
}

export interface BuildMessage {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
  column?: number;
}

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info' | 'success';
  message: string;
  timestamp: number;
  source?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  codeChanges?: AICodeChange[];
}

export interface AICodeChange {
  file: string;
  oldContent: string;
  newContent: string;
  status: 'pending' | 'applied' | 'rejected';
}

export type BottomPanelTab = 'console' | 'problems' | 'debug' | 'terminal' | 'ai';
export type AppView = 'welcome' | 'new-project' | 'ide';
