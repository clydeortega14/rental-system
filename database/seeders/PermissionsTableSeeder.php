<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'name' => 'access.admin.module',
                'guard_name' => 'admin'
            ],
        ];

        foreach ($permissions as $permission) {
            \App\Models\AdminPermission::firstOrCreate($permission);
        }
    }
}
