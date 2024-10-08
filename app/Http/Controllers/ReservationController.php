<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\BookingService;
use App\Models\Booking;
use App\Models\BookingStatus;

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

    public function update($uuid, Request $request)
    {
        $booking = Booking::where('uuid', $uuid)->first();

        if(is_null($booking)) return back()->with('error', 'Booking Not Found')->first();

        if($request->action == "cancelled"){
            // validate reason
            $request->validate([
                'reason' => 'required'
            ]);
            
        }else if($request->action == "rescheduled"){
            // validate new data
            $request->validate([
                'pick_up_date' => ['required'],
                'drop_off_date' => ['required'],
            ]);


            $booking->is_rescheduled = true;
            $booking->pick_up_date = $request->pick_up_date;
            $booking->drop_off_date = $request->drop_off_date;
            $booking->pick_up_time = !is_null($request->pick_up_time) || $request->pick_up_time !== "" ? $request->pick_up_time : $booking->pick_up_time;
            $booking->drop_off_time = !is_null($request->drop_off_time) || $request->drop_off_time !== "" ? $request->drop_off_time : $booking->drop_off_time;
            $booking->save();
        }

        $this->booking_service->updateStatus($booking, [
            'action' => $request->action
        ]);

        return back()->with('status', 'Successfully updated');
    }

    public function complete($uuid, Request $request)
    {
        $booking = Booking::where('uuid', $uuid)->first();

        if(is_null($booking)) return back()->with('error', 'Booking Not Found')->first();

        $status = BookingStatus::where('name', 'completed')->first();

        $booking->status = $status->id;
        
        $booking->save();

    }

    public function cancel($uuid, Request $request)
    {
        $booking = Booking::where('uuid', $uuid)->first();

        if(is_null($booking)) return back()->with('error', 'Booking Not Found')->first();

        $status = BookingStatus::where('name', 'cancelled')->first();

        $booking->status = $status->id;

        $booking->save();

        return redirect()->back()->with('success_message', 'Booking has been cancelled');
    }
}
