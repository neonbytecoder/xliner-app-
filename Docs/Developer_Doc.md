# Xliner — Professional Developer Project Documentation

## 1. Project Overview

**Product Name:** Xliner
**Product Type:** Progressive Web App (PWA) / Browser-Based Development Environment
**Primary Platform:** macOS
**Technology:** Modern Web Technologies + PWA
**Branding:** Use the provided `@Docs/logo.png` as the official Xliner logo/reference.

### Product Vision

Xliner is a professional, corporate, browser-based development environment inspired by the overall workflow, structure, and usability of Apple's Xcode.

The application should provide developers with a familiar integrated development environment experience directly inside a browser-installed PWA, without requiring a large native application installation.

Xliner should feel like a **professional desktop development application**, not like a traditional website.

The application should provide:

* Project creation
* Project templates
* Platform selection
* Code editor
* File/project navigator
* Live preview
* AI-assisted coding
* Cascade-style AI workspace
* Debugging tools
* Simulator-style testing interface
* Build and run workflows
* Project settings
* Developer tools
* Terminal integration concept
* Performance information
* Automated workflows
* Professional developer dashboard

---

# 2. Important Product Requirement

## Xliner Must Be a PWA

Xliner must be developed as a **Progressive Web App**.

The user should be able to:

1. Open Xliner in a browser.
2. See an **Install Xliner** option.
3. Install Xliner as a PWA on macOS.
4. Launch Xliner from the installed application.
5. Use it in a dedicated application window without normal browser navigation UI.
6. Have the application behave like a professional desktop application.

The PWA should support:

* Web App Manifest
* Service Worker
* Offline shell/caching
* Standalone display mode
* Application icon
* Splash/loading experience
* Installability
* Persistent local project data where technically possible
* Fast startup
* Responsive desktop UI

---

# 3. Lightweight Application Requirement

Xliner must be designed as an extremely lightweight application.

### Target

The application shell should be optimized to remain extremely small and fast, with a target of approximately **0.5 MB for the initial application shell where technically achievable**.

Do not bundle unnecessary libraries, assets, simulators, SDKs, or large binaries into the PWA.

### Important

Xliner must **NOT require downloading large simulator packages**.

Do not require:

* iOS Simulator downloads
* macOS SDK downloads
* watchOS simulator downloads
* visionOS simulator downloads
* Large local development SDK bundles

Instead, simulator functionality should initially be implemented as a **browser-based simulation/preview environment**.

The simulator should visually and functionally represent supported target environments without requiring gigabytes of local storage.

---

# 4. Xliner Design Philosophy

The application should be inspired by the **professional workflow of Xcode**, while remaining an original product.

The interface should feel:

* Professional
* Corporate
* Developer-focused
* Clean
* Precise
* Dense but readable
* Fast
* Native-desktop inspired
* Consistent
* Minimal
* Technically sophisticated

Do not create a generic SaaS dashboard.

Xliner should feel like a serious IDE.

---

# 5. Branding

## Official Product Name

**Xliner**

The product name must be consistently displayed as:

> Xliner

Do not use:

* X-Liner
* Xline
* XCode
* Xcoder

## Logo

Use the provided:

`@Docs/logo.png`

as the official branding reference.

The logo should be used consistently throughout:

* PWA icon
* Login/start screen
* Application header
* Project selection
* Loading screen
* Empty states
* About section
* Application icon where appropriate

Do not replace the provided logo with an unrelated generated logo.

---

# 6. Application Startup Experience

When Xliner is launched, display a professional startup/project selection experience.

The initial screen should be inspired by the workflow of Xcode's project launcher.

## Startup Screen

Primary actions:

### Create New Project

Button:

**Create a new Xliner project**

### Open Existing Project

Allow the user to open an existing supported project/workspace.

### Recent Projects

Display recently opened projects with:

* Project name
* Project type
* Last opened time
* Project location
* Open button
* More actions

### Project Search

Provide a search field for recent projects.

---

# 7. Create New Project Workflow

When the user selects:

**Create a new Xliner project**

open a professional multi-step project creation interface.

---

## Step 1 — Platform & Template Selection

Provide platform selection at the top.

Example platforms:

* iOS
* iPadOS
* macOS
* watchOS
* tvOS
* visionOS
* Web
* Cross-platform

These options represent project targets inside Xliner.

### Template Categories

Provide categories such as:

* Application
* Game
* Utility
* Productivity
* Web App
* Dashboard
* AI Application
* API Client
* Empty Project

### Application Template

The primary application template should be:

**App**

User selects:

**App → Next**

---

# 8. Step 2 — Project Configuration

Display professional project configuration fields.

### Required Fields

**Product Name**

Example:

`My First App`

**Organization Identifier**

Example:

`com.example`

**Bundle Identifier**

Automatically generated:

`com.example.MyFirstApp`

**Interface**

Options:

* SwiftUI
* UIKit
* Web UI
* Custom

Default:

**SwiftUI**

**Language**

Options:

* Swift
* JavaScript
* TypeScript

Default:

**Swift**

### Additional Settings

Provide:

* Project location
* Git repository initialization
* README generation
* AI assistance
* Local storage
* Project metadata
* Build configuration

Primary button:

**Create**

---

# 9. Project Creation

After clicking Create, Xliner should automatically generate the project structure.

Example:

```text
MyFirstApp/
├── MyFirstApp.xliner
├── Sources/
│   ├── App.swift
│   └── ContentView.swift
├── Assets/
│   ├── Assets.xcassets
│   └── AppIcon
├── Resources/
├── Tests/
├── Config/
└── README.md
```

The project structure should be represented inside the Xliner Project Navigator.

---

# 10. Main Xliner IDE

After project creation, open the main development environment.

The interface should have a professional IDE layout.

## Main Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Xliner Toolbar                                               │
├───────────────┬──────────────────────────────┬───────────────┤
│               │                              │               │
│ Project       │                              │ Inspector     │
│ Navigator     │       Code Editor            │ / Properties  │
│               │                              │               │
│               │                              │               │
├───────────────┴──────────────────────────────┴───────────────┤
│ Debug / Console / Preview / AI / Terminal / Problems         │
└─────────────────────────────────────────────────────────────┘
```

---

# 11. Left Sidebar — Project Navigator

The left sidebar should provide a professional project/file navigator.

Example:

```text
PROJECT
  MyFirstApp
    Sources
      App.swift
      ContentView.swift
    Assets
      Assets.xcassets
    Resources
    Tests
    Config
    README.md
```

Features:

* Expand/collapse folders
* Create file
* Create folder
* Rename
* Delete
* Duplicate
* Search
* Drag and drop
* Context menu
* File status indicators
* Git status indicators

---

# 12. Code Editor

The central area should contain a professional code editor.

Required capabilities:

* Syntax highlighting
* Line numbers
* Code folding
* Auto indentation
* Code completion
* Search
* Replace
* Multi-cursor support
* Bracket matching
* Error highlighting
* Warning highlighting
* File tabs
* Split editor
* Keyboard shortcuts
* Command palette

The editor should feel like a professional desktop IDE.

---

# 13. SwiftUI-Style Live Preview

Xliner should provide a Live Preview experience inspired by Xcode's SwiftUI Canvas.

Example:

```text
┌──────────────────────────┬───────────────────────┐
│ ContentView.swift        │ Live Preview          │
│                          │                       │
│ struct ContentView...    │     ┌───────────┐     │
│                          │     │   Hello   │     │
│                          │     │   World   │     │
│                          │     └───────────┘     │
│                          │                       │
└──────────────────────────┴───────────────────────┘
```

### Preview Features

* Live rendering
* Refresh
* Device size selection
* Portrait / landscape
* Zoom
* Interactive controls
* Select UI element
* Highlight corresponding source
* Preview errors
* Preview reload

---

# 14. Select Mode

Provide a professional **Select Mode**.

When enabled:

1. User clicks an element in the preview.
2. Xliner identifies the corresponding component.
3. The source code is highlighted.
4. Inspector displays component properties.

Example:

```text
Preview Element
      ↓
Button
      ↓
ContentView.swift
      ↓
Button("Continue")
```

---

# 15. AI Coding Intelligence

Xliner should include integrated AI coding assistance.

### Predictive Code Completion

AI should analyze:

* Current file
* Project structure
* Existing functions
* Variables
* Types
* Components
* Imports
* Errors

and provide intelligent code suggestions.

Features:

* Inline completion
* Function generation
* Refactoring
* Bug fixing
* Documentation generation
* Code explanation
* Optimization
* Test generation

---

# 16. Cascade-Style AI Workspace

Xliner should include a dedicated AI development workspace inspired by modern AI coding environments such as Cascade-style interfaces.

The AI workspace should be editable and fully integrated into the project.

### Example Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ AI Assistant                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ User:                                                        │
│ "Create a login screen."                                    │
│                                                             │
│ AI:                                                         │
│ Creating authentication UI...                               │
│                                                             │
│ [Review Changes] [Apply Changes] [Reject]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### AI Capabilities

The AI should be able to:

* Read project files
* Understand project architecture
* Create files
* Modify files
* Refactor code
* Fix errors
* Explain code
* Generate components
* Generate tests
* Search project files
* Suggest improvements
* Review changes
* Apply/reject changes

---

# 17. AI Change Review

Never silently overwrite important user code.

When AI proposes modifications, provide:

* Changed files
* Added lines
* Removed lines
* Modified lines
* Diff viewer

Actions:

**Apply**

**Reject**

**Review**

**Undo**

---

# 18. Simulator / Device Preview

Xliner must include a simulator-style interface without requiring large downloads.

## Supported Preview Devices

Examples:

* iPhone
* iPad
* Mac
* Apple Watch
* Apple TV
* Vision-style device

These should initially be browser-rendered simulation environments.

### Device Controls

Provide:

* Device selector
* Orientation
* Scale
* Resolution
* Refresh
* Restart
* Home
* Back where applicable
* Screenshot
* Console

---

# 19. No Large Simulator Downloads

The simulator must NOT require the user to download gigabytes of data.

Architecture:

```text
Xliner PWA
    ↓
Browser Runtime
    ↓
Virtual Device Renderer
    ↓
Project Preview
```

The simulator should be implemented through web technologies where possible.

---

# 20. Run Project

The main toolbar should contain:

**Run ▶**

When clicked:

1. Validate project.
2. Compile/transform supported source.
3. Display build progress.
4. Start preview environment.
5. Show application preview.
6. Display logs and errors.

Example toolbar:

```text
[Project] [Device: iPhone] [Run ▶] [Stop ■]
```

---

# 21. Build System

Xliner should include a lightweight browser-compatible build abstraction.

Build stages:

```text
Source
   ↓
Validation
   ↓
Dependency Resolution
   ↓
Compilation / Transformation
   ↓
Build
   ↓
Preview
```

Display:

* Build progress
* Build time
* Errors
* Warnings
* Success status

---

# 22. Debugging

Provide a dedicated debugging panel.

### Debug Sections

* Console
* Errors
* Warnings
* Network
* State
* Logs
* Performance

Example:

```text
DEBUG CONSOLE

✓ Build succeeded
✓ Preview started

Warnings: 2
Errors: 0
```

---

# 23. LLDB-Inspired Debugger Experience

Because a browser PWA cannot directly provide Apple's native LLDB runtime, Xliner should provide an **LLDB-inspired debugging interface** rather than falsely claiming to run LLDB.

Features:

* Breakpoint UI
* Call stack
* Variables
* Watch expressions
* Debug console
* Step over
* Step into
* Step out
* Continue
* Pause

For supported web/runtime projects, use browser debugging capabilities.

---

# 24. Problems Panel

Provide a dedicated Problems section.

Categories:

* Errors
* Warnings
* Suggestions
* AI recommendations

Example:

```text
PROBLEMS

ERROR
ContentView.swift:18
Cannot find 'userName' in scope

WARNING
ContentView.swift:25
Unused variable
```

Clicking an error should navigate directly to the relevant source line.

---

# 25. Inspector

The right-side Inspector should provide contextual information.

Possible tabs:

* Properties
* Attributes
* Layout
* Preview
* Documentation
* AI
* Project Settings

When a UI element is selected, show relevant properties.

---

# 26. Project Settings

Provide a professional settings interface.

Sections:

### General

* Project name
* Bundle ID
* Version
* Build number
* Deployment target

### Build

* Build configuration
* Optimization
* Source settings

### Signing

* Signing information
* Certificates concept
* Team/project identity

### Assets

* App icon
* Colors
* Fonts

### AI

* AI provider
* Model
* API configuration
* Context settings

---

# 27. Assets Management

Provide an Assets Catalog experience.

Users should be able to manage:

* App icons
* Images
* Logos
* Colors
* Fonts
* Media

Support:

* Drag & drop
* Upload
* Rename
* Preview
* Delete
* Metadata

---

# 28. Terminal

Provide a lightweight integrated terminal interface where technically supported.

Example:

```text
$ npm install
$ npm run dev
$ git status
$ git commit
```

The terminal should clearly distinguish between:

**Browser sandbox commands**

and

**Local machine commands**

because a PWA cannot automatically receive unrestricted macOS shell access.

---

# 29. Git Integration

Provide Git-inspired source control functionality.

Features:

* Repository initialization
* Branches
* Commit
* Changes
* Diff
* History
* Stage
* Unstage
* Push
* Pull

UI:

```text
SOURCE CONTROL

Changes
  M ContentView.swift
  M App.swift
  + LoginView.swift

[Stage All]

Commit Message
[ Add authentication UI ]

[Commit]
```

---

# 30. Project Search

Global search should search:

* Files
* Code
* Symbols
* Components
* Documentation
* AI context

Keyboard shortcut:

`Command + Shift + F`

---

# 31. Command Palette

Provide a professional command palette.

Example:

```text
Search Commands...

> Create New File
> Open Project
> Run Project
> Build Project
> Format Code
> Open AI Assistant
> Toggle Preview
> Open Terminal
> Git Commit
> Project Settings
```

---

# 32. Documentation Viewer

Provide an integrated documentation viewer.

Users should be able to search:

* Framework documentation
* Project documentation
* API documentation
* Generated documentation
* AI explanations

---

# 33. Performance Panel

Provide lightweight performance information.

Metrics may include:

* Build time
* Preview startup time
* Runtime performance
* Memory information where browser APIs permit
* Network requests
* Bundle size
* Asset size

Use professional graphs and metrics.

---

# 34. Instruments-Inspired Performance UI

Because native Apple Instruments cannot be embedded directly into a PWA, create an **Instruments-inspired performance dashboard**.

Example:

```text
PERFORMANCE

CPU
████████████░░ 62%

Memory
███████░░░░░░ 41%

Network
████░░░░░░░░░ 18 requests

Render
█████████░░░░ 72 FPS
```

Do not claim these are Apple's native Instruments metrics.

---

# 35. Automated Development Workflow

Xliner should automate common developer operations.

Example workflow:

```text
Create Project
      ↓
Generate Files
      ↓
Validate Code
      ↓
Build
      ↓
Launch Preview
      ↓
Detect Errors
      ↓
AI Analysis
      ↓
Fix
      ↓
Rebuild
      ↓
Preview
```

---

# 36. AI Automatic Error Resolution

When a build fails:

```text
Build Failed

Error detected:
Missing component reference.

[Ask Xliner AI to Fix]
```

AI should:

1. Analyze error.
2. Locate source.
3. Explain problem.
4. Propose fix.
5. Show diff.
6. Allow user approval.
7. Apply fix.
8. Rebuild project.

---

# 37. PWA Offline Architecture

Xliner should continue to load when temporarily offline.

Cache:

* Application shell
* UI assets
* Core JavaScript
* CSS
* Icons
* Static documentation

Project data should preferably be stored locally using:

* IndexedDB
* Cache Storage
* File System Access API where supported

Do not store sensitive API keys insecurely in client-side storage.

---

# 38. Data Architecture

Recommended architecture:

```text
Xliner PWA
│
├── UI Layer
│
├── Project Manager
│
├── Code Editor
│
├── Preview Engine
│
├── AI Engine
│
├── Build Engine
│
├── Debug Engine
│
├── Git Layer
│
└── Local Storage
```

---

# 39. Suggested Technology Stack

### Frontend

Recommended:

* React
* TypeScript
* Vite
* Modern CSS
* Monaco Editor or equivalent professional code editor
* Service Worker
* Web App Manifest

### State Management

Use a lightweight state management solution where necessary.

### Local Storage

Prefer:

* IndexedDB
* File System Access API
* Cache API

### PWA

Implement:

* `manifest.webmanifest`
* Service Worker
* Offline caching
* Install prompt
* Standalone mode

---

# 40. Recommended Project Structure

```text
xliner/
│
├── public/
│   ├── logo.png
│   ├── manifest.webmanifest
│   └── icons/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── editor/
│   ├── project/
│   ├── preview/
│   ├── simulator/
│   ├── ai/
│   ├── debugger/
│   ├── terminal/
│   ├── git/
│   ├── settings/
│   ├── storage/
│   └── utils/
│
├── workers/
│   ├── service-worker.ts
│   └── build-worker.ts
│
├── tests/
│
├── package.json
└── README.md
```

---

# 41. Responsive Design

Although Xliner is primarily a desktop development environment, the application should remain responsive.

### Desktop

Full IDE experience.

### Tablet

Adaptive:

* Collapsible navigator
* Collapsible inspector
* Responsive editor

### Mobile

Provide limited functionality:

* Project browsing
* Code viewing
* AI assistant
* Documentation
* Project status

The complete IDE should be optimized for large desktop displays.

---

# 42. Professional UI Requirements

The UI must have:

* Consistent spacing
* Professional typography
* Subtle borders
* Clean icons
* Minimal visual noise
* Proper hover states
* Active states
* Keyboard navigation
* Context menus
* Tooltips
* Smooth transitions
* Professional empty states
* Professional loading states
* Error states
* Confirmation dialogs

Avoid:

* Excessive gradients
* Oversized cards
* Generic SaaS dashboard design
* Unnecessary animations
* Cartoon-style UI
* Excessive rounded elements
* Visual clutter

---

# 43. macOS PWA Experience

When installed, Xliner should launch in:

**Standalone application mode**

The user should not need to interact with normal browser tabs after installation.

The experience should resemble:

```text
Xliner
┌────────────────────────────────────────────────────┐
│ Project   Edit   View   Navigate   Product   Help │
├────────────────────────────────────────────────────┤
│                                                    │
│                 Xliner IDE                         │
│                                                    │
└────────────────────────────────────────────────────┘
```

Where supported by the browser/PWA environment, use macOS-compatible window behavior.

---

# 44. Installation Flow

Browser:

```text
Open Xliner
     ↓
Install Xliner
     ↓
Browser installation prompt
     ↓
Install
     ↓
Xliner launches as PWA
```

The application should not require a traditional `.dmg` installer.

---

# 45. Security Requirements

Security must be considered from the beginning.

Implement:

* HTTPS
* Content Security Policy
* Secure API communication
* Input validation
* XSS protection
* CSRF protection where applicable
* Secure authentication
* Secure project permissions
* Safe AI tool execution
* No unrestricted arbitrary command execution from the browser
* API key protection

Never expose server-side secrets in frontend JavaScript.

---

# 46. AI Security

AI-generated code must not automatically execute arbitrary commands.

Use a permission model:

```text
AI wants to execute command:

npm install package-name

[Allow Once]
[Allow]
[Reject]
```

For potentially destructive operations:

```text
AI wants to delete:

/src/old-component.tsx

[Review]
[Cancel]
```

---

# 47. Accessibility

Xliner should support:

* Keyboard navigation
* Screen-reader labels
* Focus management
* Accessible contrast
* Reduced motion
* Semantic controls
* Tooltips
* Shortcut documentation

---

# 48. Error Handling

Every major operation must have proper error handling.

Examples:

* Project creation failure
* File read failure
* Build failure
* Preview failure
* AI failure
* Network failure
* Storage failure
* Git failure

Never display raw technical errors to users without context.

Instead:

```text
Unable to build project.

Xliner could not resolve the required dependency.

[View Details]
[Ask AI to Diagnose]
```

---

# 49. Performance Requirements

Xliner should prioritize:

* Fast first load
* Lazy loading
* Code splitting
* Worker-based processing
* Minimal dependencies
* Efficient rendering
* Virtualized file trees
* Efficient editor loading
* Cached static resources
* Optimized assets

Do not load heavy modules until they are required.

---

# 50. First MVP

The first production MVP should prioritize:

### Phase 1

* PWA installation
* Xliner branding
* Startup screen
* New Project
* Template selection
* Project configuration
* Project Navigator
* Code Editor
* File management
* Live Preview
* Device Preview
* Run/Stop
* Console
* Project Settings

### Phase 2

* AI Assistant
* Cascade-style workspace
* AI code generation
* AI code fixing
* Diff review
* Command Palette
* Git

### Phase 3

* Advanced simulator
* Performance dashboard
* Documentation
* Advanced debugging
* Collaboration
* Cloud projects
* Automated builds

---

# 51. Critical Technical Limitation

Xliner should replicate the **development experience and workflow** of Xcode, but it must not falsely represent browser functionality as Apple's native technology.

A PWA cannot directly reproduce Apple's proprietary:

* Xcode compiler toolchain
* iOS SDK
* macOS SDK
* LLDB runtime
* Apple Simulator runtime
* Instruments
* Xcode Cloud infrastructure

Therefore, these should be implemented as **Xliner-native browser equivalents or integrations**.

The UX can be strongly inspired by professional IDE workflows while the underlying implementation remains technically realistic.

---

# 52. Final Acceptance Criteria

The project is considered complete when:

* Xliner opens correctly in a browser.
* Xliner is installable as a PWA.
* Installed Xliner launches in standalone mode.
* `@Docs/logo.png` is used as the official logo.
* Startup/project selection works.
* New Project workflow works.
* Platform and template selection works.
* Project configuration works.
* Project creation works.
* Project Navigator works.
* Code editor works.
* Files can be created, edited, renamed, and deleted.
* Live Preview works.
* Device preview works.
* Run/Stop works.
* Console works.
* Problems panel works.
* Project settings work.
* AI workspace works when configured.
* AI code changes can be reviewed before applying.
* No large simulator package is required.
* Application is optimized for minimal initial download.
* Offline application shell works.
* UI is responsive.
* Keyboard shortcuts work.
* Loading/error/empty states are professional.
* Security controls are implemented.
* No major console errors remain.
* No broken navigation remains.
* All primary buttons and workflows are functional.

---

# 53. Product Goal

The final result should feel like:

> **“Xcode-inspired professional development environment, rebuilt as a lightweight installable PWA for macOS.”**

The user should be able to open a browser, install **Xliner**, launch it like an application, create a project, edit code, preview the application, use AI assistance, debug the project, and manage the development workflow — without downloading a multi-gigabyte simulator or native IDE package.

**Primary Objective:**

Build a professional, corporate, highly polished, lightweight and functional **Xliner PWA IDE** with an Xcode-inspired developer experience and Xliner-specific implementation.
