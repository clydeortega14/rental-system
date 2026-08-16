import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';


export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(), '');

    console.log('VITE_HOST:', env.VITE_HMR_HOST);
    console.log('VITE_PORT:', env.VITE_PORT);

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.tsx',
                refresh: true,
            }),
            react(),
        ],
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT ?? 5173),
            strictPort: true,
            hmr: {
                host: env.VITE_HMR_HOST ?? 'localhost',
                port: Number(env.VITE_PORT ?? 5173)
            }
        }
    }

});
