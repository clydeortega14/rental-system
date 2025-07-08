- Execute RolesTableSeeder
- Execute AdminsTableSeeder
- Open laravel's interactive shell by running: php artisan tinker
    - execute the following
    >>> $user = \App\Models\Admin::where('email', 'admin@renthive.com')->first();
    >>> $user->assignRole('admin'); 
