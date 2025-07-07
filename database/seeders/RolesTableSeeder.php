<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
             'name' => 'superadmin',
             'guard_name' => 'admin',
            ],
            [
             'name' => 'admin',
             'guard_name' => 'admin',
            ],
            [
             'name' => 'lessee',
             'guard_name' => 'web',
            ],
            [
             'name' => 'lessor',
             'guard_name' => 'web',
            ],
        ];

        foreach ($roles as $role) {
            \App\Models\AdminRole::firstOrCreate($role);
        }
    }
}
