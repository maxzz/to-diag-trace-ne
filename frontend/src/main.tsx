import React from 'react';
import ReactDOM from 'react-dom/client';
import Neutralino from '@neutralinojs/lib';
import { App } from './App';
import { restoreWindowOptions, saveWindowOptions } from './neutralino';
import './index.css';

// Initialize Neutralino client
Neutralino.init();

// Track last saved geometry to avoid redundant disk writes
let lastX = 0;
let lastY = 0;
let lastWidth = 0;
let lastHeight = 0;

// Periodically check and save window geometry in the background
setInterval(async () => {
    try {
        const size = await Neutralino.window.getSize();
        const pos = await Neutralino.window.getPosition();
        
        // If geometry has changed, persist it to init.json
        if (pos.x !== lastX || pos.y !== lastY || size.width !== lastWidth || size.height !== lastHeight) {
            lastX = pos.x ?? 0;
            lastY = pos.y ?? 0;
            lastWidth = size.width ?? 0;
            lastHeight = size.height ?? 0;
            await saveWindowOptions();
        }
    } catch (e) {
        // Ignored during shutdown or startup
    }
}, 1000);

// Handle windowClose event - must be synchronous and fast to avoid deadlocks
Neutralino.events.on('windowClose', () => {
    // Forcibly and cleanly terminate the Neutralino process instantly
    Neutralino.app.killProcess().catch(() => {
        // Fallback exit if killProcess somehow fails
        Neutralino.app.exit(0);
    });
});

// Restore window options (size, pos) and then show the window
restoreWindowOptions().catch(console.error);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
