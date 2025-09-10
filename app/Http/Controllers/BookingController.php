<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBookingRequest;
use App\Models\RentalAddItem;
use App\Models\BookingStatus;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\DateHelpers;
use App\Models\Booking;
use App\Models\RecentActivity;

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
            'returnTime' => 'required',
            'pickUpTime' => 'required',
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
            'startDate', 'endDate', 'startTime', 'returnTime', 'duration', 'pickUpTime'
        ) + [
            'category' => [
                'id' => $item->toCategory->id,
                'name' => $item->toCategory->name
            ],
            'rental_listing' => [
                'id' => $item->id,
                'name' => $item->itemName,
                'description' => $item->description,
                'price' => $item->price,
            ],
            'status' => [
                'id' => $status->id,
                'name' => $status->name
            ],
            'partial_total' => $request->partial_total,
            'duration_quantity' => $duration,
            'checkout' => true,
        ]);

        return redirect(route('item.review'));
    }

    public function checkOutBooking(StoreBookingRequest $request)
    {
        // check if session has a booking data, if none then return back;
        if(!$request->session()->has('booking_data')) return;

        // declare local variable to session booking data
        $data = $request->session()->get('booking_data');

        // store booking data to database 
        $this->booking_service->storeBooking($data + [
            'service_fee' => $request->service_fee,
            'total_cost' => $request->total_cost,
            'booked_by' => auth()->user()->id,
            'endTime' => $data['returnTime'],
            'duration_type' => 'daily',
        ]);
        

        // store transaction to activity logs
        RecentActivity::create([
            'user_id' => $request->user()->id,
            'message' => 'You booked a rental item successfully.',
            'status' => '1',
        ]);

        
        // sending emails to users

        // forget the session
        $request->session()->forget(['booking_data']);

        // return redirect(route('dashboard'));
        return to_route('lessee.profile');
    }

    public function calendar()
    {
        $events = $this->booking_service->formatForCalendar();
        
        return inertia('BookingCalendar', [
            'events' => $events,
        ]);
    }

    public function bookingView($uuid)
    {
        $booking = Booking::
        leftJoin('users', 'bookings.booked_by', '=', 'users.id')
        ->leftJoin('rental_listings as rl', 'bookings.rental_listing_id', '=', 'rl.id')
        ->leftJoin('booking_statuses as bs', 'bookings.status', '=', 'bs.id')
        ->select(
            'bookings.id', 
            'bookings.uuid',
            'users.id as customerId',
            'users.name as customerName', 
            'bookings.start_date as startDate', 
            'bookings.start_time as startTime', 
            'bookings.end_date as endDate', 
            'bookings.end_time as endTime',
            'rl.itemName as itemName',
            'rl.id as itemId',
            'bs.name as status',
            'bookings.total_cost as totalPrice'
        )
        ->where('bookings.uuid', $uuid)->first();

        if(is_null($booking)) return back()->with('error', 'booking not found!');

        return inertia('BookingView', [
            'booking' => $booking
        ]);
    }

    public function updateStatus(Request $request)
    {

        $this->booking_service->updateStatus($request->booking_id, $request->action);

        return redirect()->back()->with('success', 'STATUS UPDATED!');
    }
}
