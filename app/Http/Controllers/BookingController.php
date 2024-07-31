<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBookingRequest;

class BookingController extends Controller
{
    public function bookingStore(StoreBookingRequest $request)
    {
        // validate request
        $validated = $request->validated();

        // store requests to session
        $request->session()->put('booking_data', $validated);


        return redirect(route('itemCheckout', $request->item_uuid));
    }

    public function checkOutBooking(Request $request)
    {
        //
    }
}
