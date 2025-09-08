<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AddressType;

class AddressTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AddressType::firstOrCreate([
            'name' => 'Billing'
        ]);

        AddressType::firstOrCreate([
            'name' => 'Delivery'
        ]);
    }
}
