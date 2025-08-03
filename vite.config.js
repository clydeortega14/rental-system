import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        visualizer(),
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
