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
        $request->validate([
            'phone' => 'required'
        ]);

        $data = $request->session()->get('booking_data');

        DB::transaction( function() use ($request, $data){

            // store booking details to database
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

            // manage user contact details
            $user_contact_detail = $request->user()->contact()->firstOrCreate(
                ['mobile' => $request->phone]
            );

            // manage user billing address;
            $biiling_address = $request->user()->billingAddress()->firstOrCreate(
                ['street' => $request->address],
                ['postal_code' => $request->zipCode],
                ['region' => $request->region],
                ['province' => $request->province],
                ['city' => $request->city],
                ['barangay' => $request->barangay],
                ['country' => $request->country]
            );
            // online payment processing
        
            // online payment gateway processing

            // if success, then store the data to database
            // check user card details
            if($request->payment_method === 'card')
            {
                // check card expiry date
                if(!$this->isDateFormatValid($request->cardExpiry)) return back()->with('error_message', 'invalid card format');

                if($this->isDateExpired($request->cardExpiry)) return back()->with('error_message', 'card is expired!');
                // then check card details
                // $card_detail = $request->user()->cardDetail()->firstOrCreate(
                //     ['card_number' => $request->cardNumber],
                //     ['card_expiry' => $request->cardExpiry],
                //     ['card_cvv' => $request->cardCvv]
                // );

                $card_detail = $request->user()->cardDetail()->firstOrCreate([
                    'card_number' => $request->cardNumber,
                    'card_expiry' => $request->cardExpiry,
                    'card_cvv' => $request->cardCvv
                ]);

                $payment = $card_detail->payments()->firstOrCreate(
                    // ['rental_listing_id' => $request->rental_listing_id],
                    // ['amount' => $request->total_cost],
                    // ['status' => $request->status]
                    [
                        'rental_listing_id' => $request->rental_listing_id,
                        'amount' => $request->total_cost,
                        'status' => $request->status
                    ]
                );
            } 
        });
        
        // sending emails to users

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
}
