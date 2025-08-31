<?php

namespace App\Services;
use App\Models\Booking;
use App\Models\BookingStatus;
use Carbon\Carbon;
use App\Traits\CalendarTheme;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Repositories\Contracts\BookingRepositoryInterface;

class BookingService {

    use CalendarTheme;

    public function __construct
    (
        protected BookingRepositoryInterface $booking_repository
    ){}

    public function storeBooking(array $data)
    {
        $this->booking_repository->store($data);
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
        return $this->booking_repository->bookings();
    }

    public function formatBookings()
    {
        return $this->getBookings()->map(function($booking){
            return [
                'id' => $booking->id,
                'uuid' => $booking->uuid,
                'rentalItem' => [
                    'id' => $booking->rental_listing_id,
                    'imageUrl' => count($booking->rentalListing->attachment) > 0 ?  config('app.url').'/storage/'.$booking->rentalListing->attachment[0]->file_path : 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'name' => $booking->rentalListing->itemName
                ],
                'itemId' => $booking->rental_listing_id,
                'userId' => $booking->bookedBy->id,
                'startDate' =>$booking->start_date,
                'endDate' => $booking->end_date,
                'status' => $booking->bookingStatus->name,
                'totalPrice' => $booking->total_cost
            ];
        });
    }

    public function formatForCalendar()
    {
        return $this->getBookings()->map(function($b){
            return [
                'id' => $b->id,
                'title' => $b->rentalListing->itemName,
                'start' => $b->pick_up_date.'T'.$b->pick_up_time,
                'end' => $b->drop_off_date.'T'.$b->drop_off_time,
                'backgroundColor' => $this->formatColorByStatus($b->bookingStatus->name)
            ];
        });
    }
    public function getBookingsByUser(int $userId)
    {
        return $this->booking_repository->bookings($userId)
            ->map(function($booking) {
                return [
                    'id' => $booking->id,
                    'uuid' => $booking->uuid,
                    'rentalItem' => [
                        'id' => $booking->rental_listing_id,
                        'imageUrl' => count($booking->rentalListing->attachment) > 0
                            ? config('app.url') . '/storage/' . $booking->rentalListing->attachment[0]->file_path
                            : 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                        'name' => $booking->rentalListing->itemName,
                        'description' => $booking->rentalListing->description,
                        'shopId'=> $booking->rentalListing->shop_id,
                        'shopName'=> $booking->rentalListing->toShop->name,
                        'shopLocation'=> $booking->rentalListing->toShop->location

                    ],
                    'itemId' => $booking->rental_listing_id,
                    'userId' => $booking->bookedBy->id,
                    'startDate' => $booking->start_date,
                    'endDate' => $booking->end_date,
                    'status' => $booking->bookingStatus->name,
                    'totalPrice' => $booking->total_cost
                ];
            });
    }


}