<?php


namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

class BookingRepository implements BookingRepositoryInterface
{
    //
    public function store(array $data) : void
    {
        DB::transaction( function() use ($data) {

            try {

                $booking = Booking::create([
                    'category_id' => $data['category']['id'],
                    'rental_listing_id' => $data['rental_listing']['id'],
                    'booked_by' => $data['booked_by'],
                    'status' => $data['status']['id'],
                    'start_date' => date('Y-m-d', strtotime( $data['startDate'])),
                    'end_date' => date('Y-m-d', strtotime( $data['endDate'])),
                    'start_time' => $data['startTime'],
                    'end_time' => $data['endTime'],
                    'total_cost' => $data['total_cost'],
                    'duration' => $data['duration_quantity'],
                    'duration_type' => $data['duration_type'],
                    'partial_total' => $data['partial_total'],
                    'service_fee' => $data['service_fee'],
                ]);

                DB::commit();

            } catch (\Exception $e) {
                //throw $th;
                DB::rollback();

                Log::error('{message}', ['message' => $e->getMessage()]);

                throw new Exception('Internal Server Error', 500);
            }
            
        });
    }

    public function bookings(int $userId) : Collection
    {
        return Booking::with(['category', 'bookedBy', 'rentalListing.toShop', 'bookingStatus'])
            ->where('booked_by', $userId)
            ->get();
    }
}