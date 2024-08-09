<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\BookingService;
use App\Models\Booking;

class ReservationController extends Controller
{
    protected $booking_service;

    public function __construct(BookingService $booking_service)
    {
        $this->booking_service = $booking_service;
    }


    public function index()
    {
        $headersData = [
            ['name' => 'Item'],
            ['name' => 'Reservation Detail'],
            ['name' => 'Status'],
            ['name' => 'Booked By'],
            ['name' => 'Action']
        ];

        $bookings = $this->booking_service->formatBookings();

        return Inertia::render('Reservation/Index', [

            'headerData' => $headersData,
            'bodyData' => $bookings

        ]);
    }

    public function accept(Booking $booking, Request $request)
    {
        $this->booking_service->updateStatus($booking, [
            'action' => $request->action
        ]);

        return back()->with('status', 'Successfully updated');
    }
}
