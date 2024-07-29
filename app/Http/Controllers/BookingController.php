<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function bookingStore(Request $request)
    {
        return redirect(route('itemCheckout', $request->item_uuid));
    }
}
