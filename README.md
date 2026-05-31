# to-diag-trace-ne

A lightweight, portable cross-platform desktop application built with [NeutralinoJS](https://neutralino.js.org/), React 19, TypeScript, and Tailwind CSS v4. Recreated from the Go-based Wails version (`to-diag-trace-go`) with full runtime window option persistency.

---

## Table of Contents

- [Features](#features)
- [Project Files Overview](#project-files-overview)
- [Prerequisites](#prerequisites)
- [How to Develop](#how-to-develop)
  - [1. Initial Setup](#1-initial-setup)
  - [2. Start Development Environment](#2-start-development-environment)
- [How to Build](#how-to-build)
- [Window State Persistency Architecture](#window-state-persistency-architecture)
- [License](#license)

---

## Features

- **Extreme Portability**: Leverages NeutralinoJS, yielding tiny executable bundles (~2-3MB) and negligible memory footprint.
- **Modern Stack**: Powered by React 19, TypeScript 6, Vite 8, and Tailwind CSS v4.
- **Window Bounds Persistency**: Automatically remembers the window position, width, and height between launches, storing them safely in standard OS configuration directories (`%APPDATA%` on Windows, `~/.config` on Linux, `~/Library/Application Support` on macOS).
- **Embedded Developer Tools**: Press `F12` or right-click to inspect elements during development.

---

## Project Files Overview

The workspace is organized into a main desktop wrapper and a dedicated web frontend project:

```text
to-diag-trace-ne/
├── neutralino.config.json    # Primary NeutralinoJS configuration (window size, permissions, modes)
├── package.json              # Root project tasks & scripts targeting Neutralino CLI
├── pnpm-lock.yaml            # Monorepo/project lockfile
├── .gitignore                # Files/folders excluded from Git control
├── README.md                 # Project documentation (this file)
└── frontend/                 # Web application root (Vite + React + TS workspace)
    ├── package.json          # Frontend packages and scripts
    ├── vite.config.ts        # Vite configuration incorporating React and Tailwind CSS
    ├── index.html            # Entry-point HTML file for the WebView
    ├── src/
    │   ├── main.tsx          # Client startup and SDK initialization
    │   ├── App.tsx           # Primary React component and Tailwind UI layouts
    │   ├── index.css         # Tailwind directives and layer extensions
    │   └── vite-env.d.ts     # Ambient TypeScript types for Vite
    └── public/
        ├── appicon.png       # Branded native application icon file
        ├── neutralino.js     # NeutralinoJS SDK client library (auto-downloaded)
        └── neutralino.d.ts   # NeutralinoJS SDK TypeScript ambient definitions (auto-downloaded)
```

---

## Prerequisites

Before running or building the application, ensure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (v18 or higher recommended)
2. [PNPM](https://pnpm.io/) package manager
3. [Neutralino CLI](https://www.npmjs.com/package/@neutralinojs/neu) (installed automatically as a local dependency)

---

## How to Develop

### 1. Initial Setup

Clone this repository, navigate to the root directory, and run the following command to download NPM packages and native binary engines for your current platform:

```bash
# Install root and frontend dependencies
pnpm install && pnpm run frontend:install

# Download NeutralinoJS binaries, TypeScript definitions, and client SDKs
pnpm exec neu update
```

*(Note: If you are behind a corporate proxy or experience TLS handshake exceptions, you can run `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; pnpm exec neu update` in PowerShell).*

### 2. Start Development Environment

Run the following command in the root folder to spin up the Vite development server with Hot Module Replacement (HMR) and launch the Neutralino desktop window:

```bash
pnpm run dev
```

- When the window starts up, press <kbd>F12</kbd> or right-click anywhere to open the Chromium developer console (WebView2 / WebKit debugger).
- Making modifications to any React component inside `frontend/src/` will refresh the viewport immediately.

---

## How to Build

To package your application into standalone, ready-to-run desktop packages for **Windows**, **macOS**, and **Linux**, run:

```bash
pnpm run build
```

This command triggers:
1. `tsc && vite build` inside `frontend/` to generate optimized production web assets.
2. `neu build` to compile resources, download multi-platform binaries, inject icons, and generate distributions.

The final builds are placed in:
📁 **`dist/to-diag-trace-ne/`**

Output binaries generated:
- `to-diag-trace-ne-win_x64.exe` (Windows 64-bit)
- `to-diag-trace-ne-mac_universal` / `mac_x64` / `mac_arm64` (macOS Intel, Apple Silicon, or Universal bundles)
- `to-diag-trace-ne-linux_x64` / `linux_arm64` (Linux executable targets)
- `resources.neu` (Compressed web application bundle)

---

## Window State Persistency Architecture

The application implements native cross-platform bounds and position persistency using the native NeutralinoJS config engine:

1. **`useSavedState: true`**: Handled natively in C++ inside the Neutralino core. The window coordinates, size (width/height), and maximized status are automatically saved on exit and restored on launch without any custom JavaScript scripts.
2. **`exitProcessOnClose: true`**: Standard immediate process exit, completely eliminating native thread freezes or lockups on Windows.

---

## License

This project is licensed under the MIT License - see individual files for details.
