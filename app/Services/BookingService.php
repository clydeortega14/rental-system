<?php

namespace App\Services;
use App\Models\Booking;
use App\Models\BookingStatus;
use Carbon\Carbon;
use App\Traits\CalendarTheme;
use Illuminate\Support\Facades\DB;
use Exception;

class BookingService {

    use CalendarTheme;

    public function storeBooking(array $data)
    {

        DB::transaction( function() use ($data) {

            try {

                $booking = Booking::create([
                    'category_id' => $data['category_id'],
                    'rental_listing_id' => $data['rental_listing_id'],
                    'booked_by' => $data['booked_by'],
                    'status' => $data['status'],
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

                throw new Exception($e, 500);
                
            }
            
        });
        
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


            // return [

            //     'id' => $booking->id,
            //     'uuid' => $booking->uuid,
            //     'category' => [
            //         'id' => $booking->category->id,
            //         'name' => $booking->category->name
            //     ],
            //     'rental_item' => [
            //         'id' => $booking->rentalListing->id,
            //         'itemName' => $booking->rentalListing->itemName,
            //         'images' => $booking->rentalListing->attachment->map(function($item){
            //             return [
            //                 'src' => config('app.url').'/storage/'.$item->file_path
            //             ];
            //         }),
            //     ],
            //     'booked_by' => [
            //         'id' => $booking->bookedBy->id,
            //         'name' => $booking->bookedBy->name
            //     ],
            //     'status' => [
            //         'id' => $booking->bookingStatus->id,
            //         'name' => $booking->bookingStatus->name,
            //         'className' => $booking->bookingStatus->class_name
            //     ],
            //     'completed_at' => $booking->completed_at,
            //     'pick_up_date' => $booking->format_pick_up,
            //     'pick_up_time' => $booking->pick_up_time,
            //     'pick_up_location' => $booking->pick_up_location,
            //     'drop_off_date' => $booking->format_drop_off,
            //     'drop_off_time' => $booking->drop_off_time,
            //     'drop_off_location' => $booking->drop_off_location,
            //     'is_rescheduled' => $booking->is_rescheduled
            // ];
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
    public function getBookingsByUser($userId)
    {
        return Booking::with(['category', 'bookedBy', 'rentalListing', 'bookingStatus'])
            ->where('booked_by', $userId)
            ->get()
            ->map(function($booking) {
                return [
                    'id' => $booking->id,
                    'uuid' => $booking->uuid,
                    'rentalItem' => [
                        'id' => $booking->rental_listing_id,
                        'imageUrl' => count($booking->rentalListing->attachment) > 0
                            ? config('app.url') . '/storage/' . $booking->rentalListing->attachment[0]->file_path
                            : 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                        'name' => $booking->rentalListing->itemName
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