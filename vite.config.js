import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isServe  = command === 'serve';

    return {
        base: '/build/',
        build: {
            outDir: 'public/build',
            manifest: true,
            sourcemap: false,
            emptyOutDir: true,
        },
        server: isServe ? {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT ?? 5173),
            strictPort: true,
            hmr: {
                host: env.VITE_HMR_HOST ?? 'localhost',
                port: Number(env.VITE_PORT ?? 5173)
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
        // resolve: {
        //     alias: {
        //         '@': path.resolve(__dirname, 'resources/js'),
                
        //     },
        // },
    }
})
