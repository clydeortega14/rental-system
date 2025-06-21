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
            'startDate' => 'required',
            'endDate' => 'required',
            'startTime' => 'required',
            'duration' => 'required|string',
            'partial_total' => 'required',
            'duration_quantity' => 'nullable|integer'
        ]);

        $item = RentalAddItem::where('uuid', $request->only('item_uuid'))->first();

        $status = BookingStatus::where('name', 'pending')->first();
        
        if(is_null($item)) return back()->with('error', 'Item not found!');

        if(is_null($status)) return back()->with('error', 'Pending status does not exists');

        // compute date duration
        $duration = $this->getDurationByDay($request->startDate, $request->endDate);

        // store requests to session
        $request->session()->put('booking_data', $request->only(
            'startDate', 'endDate', 'startTime', 'duration'
        ) + [
            'category_id' => $item->category_id,
            'rental_listing_id' => $item->id,
            'status' => $status->id,
            'partial_total' => $request->partial_total,
            'duration_quantity' => $duration,
        ]);

        return redirect(route('checkout.item'));
    }

    public function checkOutBooking(Request $request)
    {
        
        if(!$request->session()->has('booking_data')) return;
        // validate checkout inputs
        

        $data = $request->session()->get('booking_data');

            $this->booking_service->storeBooking([
                'category_id' => $data['category_id'],
                'rental_listing_id' => $data['rental_listing_id'],
                'booked_by' => $request->user()->id,
                'status' => $data['status'],
                'startDate' => $data['startDate'],
                'startTime' => $data['startTime'],
                'endDate' => $data['endDate'],
                'endTime' => $data['startTime'],
                'service_fee' => $request->service_fee,
                'total_cost' => $request->total_cost,
                'partial_total' => $data['partial_total'],
                'duration_quantity' => $data['duration_quantity'],
                'duration_type' => $data['duration']
            ]);

        $request->session()->forget(['booking_data']);

        // return redirect(route('dashboard'));
        return to_route('reservations.index');
    }

    public function calendar()
    {
        $events = $this->booking_service->formatForCalendar();
        
        return inertia('BookingCalendar', [
            'events' => $events,
        ]);
    }
}
