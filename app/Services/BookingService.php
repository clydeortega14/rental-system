<?php

namespace App\Services;
use App\Models\Booking;

class BookingService {

    public function storeBooking(array $data)
    {
        return Booking::create([
            'category_id' => $data['category_id'],
            'rental_listing_id' => $data['rental_listing_id'],
            'booked_by' => $data['booked_by'],
            'status' => $data['status'],
            'pick_up_date' => $data['pick_up_date'],
            'pick_up_time' => $data['pick_up_time'],
            'pick_up_location' => $data['pick_up_location'],
            'drop_off_data' => $data['drop_off_date'],
            'drop_off_time' => $data['drop_off_time'],
            'drop_off_location' => $data['drop_off_location'],
        ]);
    }
}