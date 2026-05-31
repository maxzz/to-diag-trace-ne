import React from 'react';
import ReactDOM from 'react-dom/client';
import Neutralino from '@neutralinojs/lib';
import { App } from './App';
import { restoreWindowOptions, saveWindowOptions } from './neutralino';
import './index.css';

// Initialize Neutralino client
Neutralino.init();

// Handle windowClose event
Neutralino.events.on('windowClose', async () => {
    try {
        await saveWindowOptions();
    } catch (e) {
        console.error('Error saving window bounds on close:', e);
    } finally {
        Neutralino.app.exit();
    }
});

// Restore window options (size, pos) and then show the window
restoreWindowOptions().catch(console.error);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
