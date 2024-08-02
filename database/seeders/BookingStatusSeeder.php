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
        BookingStatus::create(['name' => 'pending']);
        BookingStatus::create(['name' => 'reserved']);
        BookingStatus::create(['name' => 'cancelled']);
        BookingStatus::create(['name' => 'completed']);
        BookingStatus::create(['name' => 'rescheduled']);
    }
}
