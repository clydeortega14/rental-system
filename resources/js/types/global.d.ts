import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo<'pusher'>; // Specify generic here too
        Pusher: typeof Pusher;
    }

    var route: typeof ziggyRoute;
}
