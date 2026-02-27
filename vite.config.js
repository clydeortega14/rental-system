import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

<<<<<<< HEAD
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
=======
export default defineConfig({
    server: {
        host: '0.0.0.0',     // allows external container access
>>>>>>> 977bd85 (configs)
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
<<<<<<< HEAD
            port: 5173,
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
        },
    } : undefined,
=======
            port: 80,
            protocol: "ws"
        },
        watch: {
            usePolling: true, // needed for Docker bind mounts
        },
    },
>>>>>>> 977bd85 (configs)
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
