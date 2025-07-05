<?php

namespace Database\Seeders;

use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(!App::environment(['local', 'staging'])) {
            $this->command->error('You cannot seed the admin in production environment.');
            return;
        }

        Admin::firstOrCreate(
            [
                'email' => 'admin@renthive.com',
            ],
            [
                'name' => 'Administrator',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('admin123'),
            ]
        );

        Admin::firstOrCreate(
            [
                'email' => 'superadmin@renthive.com',
            ],
            [
                'name' => 'Super Administrator',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('superadmin123'),
            ]
        );

        $admin = Admin::where('email', 'admin@renthive.com')->first();
        if ($admin) {
            $admin->assignRole('admin');
        }
    }
}
