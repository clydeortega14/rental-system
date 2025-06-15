<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('password123'),
        ]);

        $user_company = $user->company()->create([
            'name' => 'XCY Rental Company',
            'tin' => '000-0000-000',
            'email' => 'info@xyzrentals.com'
        ]);

        $user_contact = $user->contact()->create([
            'mobile' => '09398948226'
        ]);
    }
}
