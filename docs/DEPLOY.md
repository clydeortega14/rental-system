1. Update Admin User Password

php artisan tinker

>>> $admin = App\Models\Admin::where('email', 'admin@example.com')->first();
>>> $admin->password = bcrypt('SuperSecureP@ssw0rd');
>>> $admin->save();


2. Clear and Cache Configs
    php artisan config:clear
    php artisan cache:clear
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache

3. Set Environment to Production
    APP_ENV=production
    APP_DEBUG=false
    
4. Set a secure APP_KEY
    php artisan key:generate

5. Restrict Access to Admin Routes
    Also consider limiting admin access by IP in middleware or nginx rules if applicable.

6. Force HTTPS (Optional)
    APP_URL=https://yourdomain.com
    Force HTTPS in middleware (App\Http\Middleware\ForceHttps)
        if (!$request->secure()) {
            return redirect()->secure($request->getRequestUri());
        }
    
7. Run Migrations & Seeders
    Only run admin seeder in local or staging:

8. Permissions for Storage and Logs
    Make sure Laravel can write to these: (www-data or nginx should own these folders.)
        chmod -R 775 storage
        chmod -R 775 bootstrap/cache

9. Monitor and Logging
    Set log channel:
        LOG_CHANNEL=stack
    Connect error monitoring tools like:
        Sentry
        Bugsnag
        Laravel Telescope (internal, optional)

10. Security and Optimizations
    Disable .env file access via .htaccess or nginx rules
    Use SESSION_DRIVER=database or redis for better performance
    Set CACHE_DRIVER=file or redis (avoid array)
    Configure rate-limiting (e.g., ThrottleRequests middleware)
    Set database and queue to use production servers
