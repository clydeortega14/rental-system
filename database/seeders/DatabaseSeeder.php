<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            IdListsSeeders::class,
            CategorySeeder::class,
            FormTypesSeeder::class,
            FormSeeder::class,
            BookingStatusSeeder::class,
            DataTypesSeeder::class,
            FieldTypesSeeder::class,
            CategoryCustomFieldsSeeder::class,
            CategoryCustomFieldValuesSeeder::class
        ]);
    }
}
