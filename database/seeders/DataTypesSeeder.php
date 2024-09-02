<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DataType;

class DataTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DataType::create(['name' => 'varchar']);
        DataType::create(['name' => 'text']);
        DataType::create(['name' => 'integer']);
        DataType::create(['name' => 'decimal']);
        DataType::create(['name' => 'date']);
        DataType::create(['name' => 'time']);
        DataType::create(['name' => 'boolean']);
    }
}
