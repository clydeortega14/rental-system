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

        $bookings = Booking::with(['bookedBy', 'rentalListing.toShop', 'bookingStatus'])
            ->whereHas('rentalListing', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->get();

        $grouped = $bookings->groupBy('rentalListing.id');

        $books = $bookings->map(function ($booking) use ($grouped) {
            $conflicts = $grouped[$booking->rentalListing->id]->filter(function ($other) use ($booking) {
                return $other->id !== $booking->id &&
                    $booking->start_date < $other->end_date &&
                    $booking->end_date > $other->start_date;
            });

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
                'hasConflict' => $conflicts->isNotEmpty(),
            ];
        });

        return inertia('Lessor/Reservations', [
            'reservations' => $books,
            'lessorName' => $lessor->user->name,
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:CONFIRMED,CANCELLED'],
        ]);

        $actionMap = [
            'CONFIRMED' => 'accept',
            'CANCELLED' => 'cancelled',
        ];

        $action = $actionMap[$validated['status']];

        try {
            $this->bookingService->updateStatus($booking, ['action' => $action]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update booking status: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', "Booking status updated to {$validated['status']}");

    }
}
