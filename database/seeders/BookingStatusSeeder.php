<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookingStatus;

class BookingStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BookingStatus::create([
            'name' => 'pending', 
            'border' => 'border-0 border-orange-200', 
            'text' => 'text-orange-700', 
            'background' => 'bg-orange-100'
        ]);

        BookingStatus::create([
            'name' => 'reserved', 
            'border' => 'border-0 border-blue-200', 
            'text' => 'text-blue-700',
            'background' => 'bg-blue-100'
        ]);

        BookingStatus::create([
            'name' => 'cancelled', 
            'border' => 'border-0 border-red-200', 
            'text' => 'text-orange-700',
            'background' => 'bg-red-100'
        ]);

        BookingStatus::create([
            'name' => 'completed',
            'border' => 'border-0 border-emerald-200', 
            'text' => 'text-emerald-700',
            'background' => 'bg-emerald-100'
        ]);
        BookingStatus::create([
            'name' => 'rescheduled',
            'border' => 'border-0 border-purple-200', 
            'text' => 'text-purple-700',
            'background' => 'bg-purple-100'
        ]);
    }
}
