/* ============================================
   Xliner — Project Template Generator
   ============================================ */

import type { XlinerProject, ProjectFile, Platform, Template, InterfaceType, ProjectLanguage } from './types';

function uid(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function makeFile(name: string, path: string, content: string, language?: string): ProjectFile {
  return { id: uid(), name, path, type: 'file', content, language: language || guessLang(name), gitStatus: 'none' };
}

function makeFolder(name: string, path: string, children: ProjectFile[], isExpanded = true): ProjectFile {
  return { id: uid(), name, path, type: 'folder', children, isExpanded, gitStatus: 'none' };
}

function guessLang(name: string): string {
  if (name.endsWith('.swift')) return 'swift';
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return 'typescript';
  if (name.endsWith('.js') || name.endsWith('.jsx')) return 'javascript';
  if (name.endsWith('.html')) return 'html';
  if (name.endsWith('.css')) return 'css';
  if (name.endsWith('.json')) return 'json';
  if (name.endsWith('.md')) return 'markdown';
  if (name.endsWith('.yaml') || name.endsWith('.yml')) return 'yaml';
  if (name.endsWith('.xml')) return 'xml';
  return 'plaintext';
}

function getSwiftAppContent(projectName: string): string {
  return `import SwiftUI

@main
struct ${projectName.replace(/\s+/g, '')}App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`;
}

function getSwiftContentView(): string {
  return `import SwiftUI

struct ContentView: View {
    @State private var greeting = "Hello, World!"
    
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "star.fill")
                .imageScale(.large)
                .foregroundStyle(.tint)
            
            Text(greeting)
                .font(.title)
                .fontWeight(.bold)
            
            Button("Tap Me") {
                greeting = "Welcome to Xliner!"
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}`;
}

function getWebAppHTML(projectName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>${projectName}</h1>
        </header>
        <main>
            <p>Welcome to ${projectName}!</p>
            <button id="action-btn">Get Started</button>
        </main>
    </div>
    <script src="app.js"></script>
</body>
</html>`;
}

function getWebAppCSS(): string {
  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: #1a1a2e;
    color: #e0e0e0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#app {
    text-align: center;
    padding: 2rem;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #007aff, #5856d6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

button {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    transition: transform 0.2s, background 0.2s;
}

button:hover {
    background: #0068d6;
    transform: scale(1.05);
}`;
}

function getWebAppJS(): string {
  return `// App entry point
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');
    
    btn.addEventListener('click', () => {
        btn.textContent = 'Welcome to Xliner!';
        btn.style.background = '#32d74b';
    });
    
    console.log('App initialized successfully');
});`;
}

function getTSAppContent(): string {
  return `// TypeScript App Entry Point
interface AppConfig {
    name: string;
    version: string;
    debug: boolean;
}

const config: AppConfig = {
    name: "MyApp",
    version: "1.0.0",
    debug: true,
};

function initialize(config: AppConfig): void {
    console.log(\`Initializing \${config.name} v\${config.version}\`);
    
    if (config.debug) {
        console.log("Debug mode enabled");
    }
}

initialize(config);
export default config;`;
}

function getReadme(projectName: string, platform: string): string {
  return `# ${projectName}

A ${platform} project created with Xliner.

## Overview

This project was generated using the Xliner IDE.

## Getting Started

1. Open the project in Xliner
2. Select your target device
3. Click Run ▶ to build and preview

## Project Structure

- \`Sources/\` — Main source code
- \`Assets/\` — Images, colors, and resources
- \`Resources/\` — Additional project resources
- \`Tests/\` — Unit and integration tests
- \`Config/\` — Build and project configuration

## License

Copyright © ${new Date().getFullYear()}. All rights reserved.
`;
}

export function generateProjectFiles(
  projectName: string,
  platform: Platform,
  _template: Template,
  interfaceType: InterfaceType,
  language: ProjectLanguage,
): ProjectFile[] {
  const safeName = projectName.replace(/\s+/g, '');
  
  if (platform === 'web') {
    return [
      makeFolder(safeName, `/${safeName}`, [
        makeFile(`${safeName}.xliner`, `/${safeName}/${safeName}.xliner`, JSON.stringify({ name: projectName, platform, version: '1.0.0' }, null, 2), 'json'),
        makeFolder('Sources', `/${safeName}/Sources`, [
          makeFile('index.html', `/${safeName}/Sources/index.html`, getWebAppHTML(projectName), 'html'),
          makeFile('styles.css', `/${safeName}/Sources/styles.css`, getWebAppCSS(), 'css'),
          makeFile('app.js', `/${safeName}/Sources/app.js`, getWebAppJS(), 'javascript'),
        ]),
        makeFolder('Assets', `/${safeName}/Assets`, [
          makeFolder('Assets.xcassets', `/${safeName}/Assets/Assets.xcassets`, []),
          makeFolder('AppIcon', `/${safeName}/Assets/AppIcon`, []),
        ], false),
        makeFolder('Resources', `/${safeName}/Resources`, []),
        makeFolder('Tests', `/${safeName}/Tests`, []),
        makeFolder('Config', `/${safeName}/Config`, []),
        makeFile('README.md', `/${safeName}/README.md`, getReadme(projectName, 'Web'), 'markdown'),
      ]),
    ];
  }

  if (language === 'typescript' || language === 'javascript') {
    return [
      makeFolder(safeName, `/${safeName}`, [
        makeFile(`${safeName}.xliner`, `/${safeName}/${safeName}.xliner`, JSON.stringify({ name: projectName, platform, version: '1.0.0' }, null, 2), 'json'),
        makeFolder('Sources', `/${safeName}/Sources`, [
          makeFile(`App.${language === 'typescript' ? 'ts' : 'js'}`, `/${safeName}/Sources/App.${language === 'typescript' ? 'ts' : 'js'}`, language === 'typescript' ? getTSAppContent() : getWebAppJS()),
          makeFile('ContentView.tsx', `/${safeName}/Sources/ContentView.tsx`, getSwiftContentView()),
        ]),
        makeFolder('Assets', `/${safeName}/Assets`, [
          makeFolder('Assets.xcassets', `/${safeName}/Assets/Assets.xcassets`, []),
        ], false),
        makeFolder('Resources', `/${safeName}/Resources`, []),
        makeFolder('Tests', `/${safeName}/Tests`, []),
        makeFolder('Config', `/${safeName}/Config`, []),
        makeFile('README.md', `/${safeName}/README.md`, getReadme(projectName, platform), 'markdown'),
      ]),
    ];
  }

  // Default: Swift-based project
  const isSwiftUI = interfaceType === 'swiftui';
  return [
    makeFolder(safeName, `/${safeName}`, [
      makeFile(`${safeName}.xliner`, `/${safeName}/${safeName}.xliner`, JSON.stringify({ name: projectName, platform, version: '1.0.0' }, null, 2), 'json'),
      makeFolder('Sources', `/${safeName}/Sources`, [
        makeFile('App.swift', `/${safeName}/Sources/App.swift`, getSwiftAppContent(projectName)),
        makeFile('ContentView.swift', `/${safeName}/Sources/ContentView.swift`, isSwiftUI ? getSwiftContentView() : `import UIKit\n\nclass ViewController: UIViewController {\n    override func viewDidLoad() {\n        super.viewDidLoad()\n        view.backgroundColor = .systemBackground\n    }\n}`),
      ]),
      makeFolder('Assets', `/${safeName}/Assets`, [
        makeFolder('Assets.xcassets', `/${safeName}/Assets/Assets.xcassets`, []),
        makeFolder('AppIcon', `/${safeName}/Assets/AppIcon`, []),
      ], false),
      makeFolder('Resources', `/${safeName}/Resources`, []),
      makeFolder('Tests', `/${safeName}/Tests`, [
        makeFile(`${safeName}Tests.swift`, `/${safeName}/Tests/${safeName}Tests.swift`, `import XCTest\n@testable import ${safeName}\n\nfinal class ${safeName}Tests: XCTestCase {\n    func testExample() {\n        XCTAssertTrue(true)\n    }\n}`),
      ], false),
      makeFolder('Config', `/${safeName}/Config`, []),
      makeFile('README.md', `/${safeName}/README.md`, getReadme(projectName, platform), 'markdown'),
    ]),
  ];
}

export function createProject(
  name: string,
  orgId: string,
  platform: Platform,
  template: Template,
  interfaceType: InterfaceType,
  language: ProjectLanguage,
): XlinerProject {
  const safeName = name.replace(/\s+/g, '');
  const now = Date.now();
  return {
    id: uid(),
    name,
    bundleId: `${orgId}.${safeName}`,
    orgId,
    platform,
    template,
    interfaceType,
    language,
    createdAt: now,
    lastOpened: now,
    files: generateProjectFiles(name, platform, template, interfaceType, language),
    settings: {
      general: { version: '1.0.0', buildNumber: '1', deploymentTarget: '17.0' },
      build: { configuration: 'debug', optimization: false },
      signing: { team: '', certificate: '' },
      ai: { provider: '', model: '', apiKey: '', enabled: false },
    },
  };
}
