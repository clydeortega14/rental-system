import { AxiosInstance } from 'axios';
import type {route as ziggyRoute } from 'ziggy-js';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo<'pusher'>; // Specify generic here too
        Pusher: typeof Pusher;
    }

    const route: typeof ziggyRoute;
}

export {};