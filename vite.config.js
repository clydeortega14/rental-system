import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({command}) => ({
    base: '/build/',
    build: {
        outDir: 'public/build',
        manifest: true,
        sourcemap: false,
        emptyOutDir: true,
    },
    server: command === 'serve' ? {
        host: true,
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            port: 5173,
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
        },
    } : undefined,
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
}));
