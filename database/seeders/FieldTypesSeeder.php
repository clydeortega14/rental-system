<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FieldType;

class FieldTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FieldType::create(['name' => 'input']);
        FieldType::create(['name' => 'multiline']);
        FieldType::create(['name' => 'checkbox']);
        FieldType::create(['name' => 'combobox']);
    }
}
