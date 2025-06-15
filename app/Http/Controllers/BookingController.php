<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBookingRequest;
use App\Models\RentalAddItem;
use App\Models\BookingStatus;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\DateHelpers;

class BookingController extends Controller
{
    use DateHelpers;

    protected $booking_service;

    public function __construct(BookingService $booking_service)
    {
        $this->booking_service = $booking_service;
    }

    public function bookingStore(Request $request)
    {
        // validate request
        $validated = $request->validate([
            'item_uuid' => 'nullable',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'startTime' => 'required',
            'duration' => 'required|string',
            'partial_total' => 'required'
        ]);

        $item = RentalAddItem::where('uuid', $request->only('item_uuid'))->first();

        $status = BookingStatus::where('name', 'pending')->first();
        
        if(is_null($item)) return back()->with('error', 'Item not found!');

        if(is_null($status)) return back()->with('error', 'Pending status does not exists');

        // compute date duration
        $duration = $this->getDateDuration($request->startDate, $request->endDate)->h;

        // store requests to session
        $request->session()->put('booking_data', $request->only(
            'startDate', 'endDate', 'startTime', 'duration'
        ) + [
            'category_id' => $item->category_id,
            'rental_listing_id' => $item->id,
            'status' => $status->id,
            'partial_total' => $request->calculatedTotal,
            'service_fee' => $request->service_fee,
            'total_cost' => $request->calculatedTotal,
            'duration_quantity' => $duration,
        ]);

        return redirect(route('cart.index'));
    }

    public function checkOutBooking(Request $request)
    {
        
        if($request->session()->has('booking_data')){

            $data = $request->session()->get('booking_data');

            DB::transaction(function() use ($data, $request){ 

                $this->booking_service->storeBooking([
                    'category_id' => $data['category_id'],
                    'rental_listing_id' => $data['rental_listing_id'],
                    'booked_by' => $request->booked_by,
                    'status' => $data['status'],
                    'pick_up_date' => $data['pick_up_date'],
                    'pick_up_time' => $data['pick_up_time'],
                    'pick_up_location' => $data['pick_up_location'],
                    'drop_off_date' => $data['drop_off_date'],
                    'drop_off_time' => $data['drop_off_time'],
                    'drop_off_location' => $data['drop_location'],
                    'service_fee' => $data['service_fee'],
                    'total_cost' => $data['total_cost'],
                    'partial_total' => $data['partial_total'],
                    'duration' => $data['duration']
                ]);

            });

            $request->session()->forget(['booking_data']);
        }

        return redirect(route('cart.index'));
        // return redirect(route('reservations.index'))->with('success', 'sucessfully booked a reservation');
    }

    public function calendar()
    {
        $events = $this->booking_service->formatForCalendar();
        
        return inertia('BookingCalendar', [
            'events' => $events,
        ]);
    }
}
