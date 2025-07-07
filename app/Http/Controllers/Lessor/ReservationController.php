<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Lessor;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\DateHelpers;
use App\Models\Booking;

class ReservationController extends Controller
{
    use DateHelpers;

    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function index()
    {
        $lessor = Lessor::with(['shops', 'user'])
            ->where('lessoruser_id', auth()->id())
            ->first();
            
        if (!$lessor) {
            abort(403, 'Lessor not found for this user.');
        }

        $bookings = Booking::with(['bookedBy', 'rentalListing.toShop'])
                ->whereHas('rentalListing', function ($query) {
                    $query->where('user_id', auth()->id());
                })
                ->get();

        $books = $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'guestName' => $booking->bookedBy?->name ?? 'N/A',
                'property' => $booking->rentalListing?->itemName ?? '',
                'imageUrl' => $booking->rentalListing?->imageUrl ?? '',
                'acquire' => $booking->start_date,
                'return' => $booking->end_date,
                'status' => strtoupper($booking->bookingStatus->name),
                'location' => $booking->rentalListing?->toShop?->location ?? '',
                'pricePerNight' => $booking->total_cost,
                'description' => $booking->rentalListing?->description ?? '',
                'amenities' => $booking->rentalListing?->amenities ?? [],
                'contactInfo' => $booking->bookedBy?->email ?? '',
            ];
        });

        return inertia('Lessor/Reservations', [
            'reservations' => $books,
            'lessorName' => $lessor->user->name
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:CONFIRMED,CANCELLED'],
        ]);

        $statusMap = [
            'CONFIRMED' => 2, // reserved
            'CANCELLED' => 3, // cancelled
        ];

        $booking->status = $statusMap[$validated['status']];
        $booking->save();

        return redirect()->back()->with('success', "Booking status updated to {$validated['status']}");

    }
}
