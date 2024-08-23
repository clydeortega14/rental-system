<?php

namespace App\Services;
use App\Models\Booking;
use App\Models\BookingStatus;
use Carbon\Carbon;

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
            'service_fee' => $data['service_fee'],
            'total_cost' => $data['total_cost'],
            'duration' => $data['duration'],
            'partial_total' => $data['partial_total']
        ]);
    }

    public function updateStatus($booking, array $data)
    {
        $status_query = BookingStatus::query();
        $status = '';
        
        switch($data['action']){    

            case "accept":

                $status = $status_query->where('name', 'reserved')->first();
                
                break;

            case "completed":

                $status = $status_query->where('name', 'completed')->first();
                $booking->completed_at = Carbon::now();

                break;

            case "cancelled":

                $status = $status_query->where('name', 'cancelled')->first();

                break;

            case "rescheduled":

                $status = $status_query->where('name', 'rescheduled')->first();

                break;

            default:

                break;

        }

        $booking->status = $status->id;
        $booking->save();
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
                'uuid' => $booking->uuid,
                'category' => [
                    'id' => $booking->category->id,
                    'name' => $booking->category->name
                ],
                'rental_item' => [
                    'id' => $booking->rentalListing->id,
                    'itemName' => $booking->rentalListing->itemName,
                    'images' => $booking->rentalListing->attachment->map(function($item){
                        return [
                            'src' => config('app.url').'/storage/'.$item->file_path
                        ];
                    }),
                ],
                'booked_by' => [
                    'id' => $booking->bookedBy->id,
                    'name' => $booking->bookedBy->name
                ],
                'status' => [
                    'id' => $booking->bookingStatus->id,
                    'name' => $booking->bookingStatus->name,
                    'className' => $booking->bookingStatus->class_name
                ],
                'completed_at' => $booking->completed_at,
                'pick_up_date' => $booking->format_pick_up,
                'pick_up_time' => $booking->pick_up_time,
                'pick_up_location' => $booking->pick_up_location,
                'drop_off_date' => $booking->format_drop_off,
                'drop_off_time' => $booking->drop_off_time,
                'drop_off_location' => $booking->drop_off_location,
                'is_rescheduled' => $booking->is_rescheduled
            ];
        });
    }
}