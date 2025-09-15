<?php


namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use App\Models\BookingStatus;
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

    public function updateStatus(int $bookingId, string $action) : void
    {
        $booking = Booking::findOrFail($bookingId);

       

        DB::transaction(function() use($booking, $action) {
                switch($action)
                {
                    case 'accept':

                        $status = BookingStatus::query()->withName('reserved')->first();
                    break;

                    case "completed":

                        $status = BookingStatus::query()->withName('completed')->first();
                        $booking->completed_at = Carbon::now();

                    break;

                    case "cancelled":

                        $status = BookingStatus::query()->withName('cancelled')->first();

                    break;

                    case "rescheduled":

                        $status = BookingStatus::query()->withName('rescheduled')->first();

                    break;
                    
                    case "returning":

                        $status = BookingStatus::query()->withName('returning')->first();

                    break;

                    case "returned":

                        $status = BookingStatus::query()->withName('returned')->first();
                    break;

                    case "in use":
                        
                        $status = BookingStatus::query()->withName('in use')->first();

                    break;

                    default:
                        $status = BookingStatus::query()->withName('pending')->first();;
                    break;
                }

                $booking->status = $status->id;
                $booking->save();
        });
    }

    public function bookings(int $userId) : Collection
    {
        return Booking::with(['category', 'bookedBy', 'rentalListing.toShop', 'bookingStatus'])
            ->where('booked_by', $userId)
            ->get();
    }
}