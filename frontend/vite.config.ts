import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import neutralino from 'vite-plugin-neutralino';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), neutralino()],
    server: {
        port: 5173,
        strictPort: true
    }
});
