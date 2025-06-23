<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::firstOrCreate(['slug' => 'can-manage-roles'], [
            'name' => 'Can Create, Delete, Update, Assign Permissions to Roles',
            'description' => 'Allows creating, deleting, updating, and assigning permissions to roles'
        ]);
        Permission::firstOrCreate(['slug' => 'can-view-user-management'], [
            'name' => 'Can View or Open User Management',
            'description' => 'Allows viewing or opening the User Management section'
        ]);
    }
}
