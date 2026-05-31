import React from 'react';
import ReactDOM from 'react-dom/client';
import Neutralino from '@neutralinojs/lib';
import { App } from './App';
import './index.css';

// Initialize the NeutralinoJS SDK
Neutralino.init();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
