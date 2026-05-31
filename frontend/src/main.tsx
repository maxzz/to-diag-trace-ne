import React from 'react';
import ReactDOM from 'react-dom/client';
import Neutralino from '@neutralinojs/lib';
import { App } from './App';
import { restoreWindowOptions, saveWindowOptions } from './neutralino';
import './index.css';

// Initialize Neutralino client
Neutralino.init();

// Helper to debounce callbacks
function debounce<F extends (...args: any[]) => any>(fn: F, delay: number) {
    let timer: any;
    return function (...args: Parameters<F>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Dynamically save window options when resized in the background
window.addEventListener('resize', debounce(() => {
    saveWindowOptions().catch(console.error);
}, 500));

// Handle windowClose event
Neutralino.events.on('windowClose', async () => {
    try {
        // Race saveWindowOptions against a 150ms timeout to prevent native-side deadlocks during exit
        await Promise.race([
            saveWindowOptions(),
            new Promise<void>((resolve) => setTimeout(resolve, 150))
        ]);
    } catch (e) {
        console.error('Error saving window bounds on close:', e);
    } finally {
        if (window.NL_OS === 'Darwin') {
            Neutralino.app.killProcess();
        } else {
            Neutralino.app.exit(0);
        }
    }
});

// Restore window options (size, pos) and then show the window
restoreWindowOptions().catch(console.error);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
