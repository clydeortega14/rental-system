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
        Permission::firstOrCreate(['slug' => 'can-open-button-1'], ['name' => 'Can Open Button 1']);
        Permission::firstOrCreate(['slug' => 'can-open-button-2'], ['name' => 'Can Open Button 2']);
    }
}
