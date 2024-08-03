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
            'drop_off_date' => $data['drop_off_date'],
            'drop_off_time' => $data['drop_off_time'],
            'drop_off_location' => $data['drop_off_location'],
        ]);
    }

    public function getBookings()
    {
        $booking = Booking::with(['category', 'bookedBy', 'rentalListing', 'bookingStatus'])
        ->get();

        return $booking;
    }


    public function formatBookings()
    {
        return $this->getBookings()->map(function($booking){
            return [

                'id' => $booking->id,
                'item_name' => $booking->rentalListing->itemName,
                'reservation_date' => $booking->format_pick_up.' - '.$booking->format_drop_off,
                'status' => $booking->bookingStatus->name,
                'booked_by' => $booking->bookedBy->name,
                
            ];
        });
    }
}