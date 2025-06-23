<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['slug' => 'admin'], ['name' => 'Admin']);
        $permissions = Permission::whereIn('slug', [
            'can-manage-roles',
            'can-view-user-management'
        ])->pluck('id');
        $adminRole->permissions()->sync($permissions);
    }
}
