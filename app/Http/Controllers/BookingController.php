<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBookingRequest;
use App\Models\RentalAddItem;
use App\Models\BookingStatus;
use App\Services\BookingService;

class BookingController extends Controller
{

    protected $booking_service;

    public function __construct(BookingService $booking_service)
    {
        $this->booking_service = $booking_service;
    }


    public function bookingStore(StoreBookingRequest $request)
    {
        // validate request
        $validated = $request->validated();

        $item = RentalAddItem::where('uuid', $validated['item_uuid'])->first();
        $status = BookingStatus::where('name', 'pending')->first();
        
        if(is_null($item))
        {
            return back()->with('error', 'Item not found!');
        }        

        // dd(is_null($validated['drop_off_location']) ? $validated['pick_up_location'] : $validated['drop_off_location']);
        // store requests to session
        $request->session()->put('booking_data', $validated + [
            'category_id' => $item->category_id,
            'rental_listing_id' => $item->id,
            'status' => $status->id,
            'drop_location' => is_null($validated['drop_off_location']) ?  $validated['pick_up_location'] : $validated['pick_up_location']
        ]);


        return redirect(route('itemCheckout', $request->item_uuid));
    }

    public function checkOutBooking(Request $request)
    {
        if($request->session()->has('booking_data')){

            $data = $request->session()->get('booking_data');

            $booking = $this->booking_service->storeBooking([
                'category_id' => $data['category_id'],
                'rental_listing_id' => $data['rental_listing_id'],
                'booked_by' => $request->booked_by,
                'status' => $data['status'],
                'pick_up_date' => $data['pick_up_date'],
                'pick_up_time' => $data['pick_up_time'],
                'pick_up_location' => $data['pick_up_location'],
                'drop_off_date' => $data['drop_off_date'],
                'drop_off_time' => $data['drop_off_time'],
                'drop_off_location' => $data['drop_location']
            ]);
    
            $request->session()->forget(['booking_data']);
        }
        return redirect(route('reservations.index'));
    }
}
