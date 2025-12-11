- Execute RolesTableSeeder
- Execute AdminsTableSeeder
- Open laravel's interactive shell by running: php artisan tinker
    - execute the following
    >>> $user = \App\Models\Admin::where('email', 'admin@renthive.com')->first();
    >>> $user->assignRole('admin'); 



- rc-picker package bug fix (path-package)
    - Execute the ff
    >>> rm -r node_modules
    >>> rm package-lock.json
    >>> npm install
