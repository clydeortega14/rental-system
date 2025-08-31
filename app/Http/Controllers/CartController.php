<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Renter/Cart', [
            'booking_data' => $request->session()->get('booking_data')
        ]);
    }
}
