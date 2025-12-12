import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',     // allows external container access
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            port: 80,
            protocol: "ws"
        },
        watch: {
            usePolling: true, // needed for Docker bind mounts
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: [
                'resources/js/Pages/**',
                'resources/js/Components/**',
            ],
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            
        },
    },
});
