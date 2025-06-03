<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Rating;
use Illuminate\Http\Request;
Use Illuminate\Support\Facades\Auth;
use App\Notifications\NewRatingReceived;
use App\Http\Requests\StoreBookingRequest;

class RatingController extends Controller
{
   public function create(Booking $booking)
    {
        // Basic authorization check
        if ($booking->booked_by !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return view('ratings.create', [
            'booking' => $booking,
            'ratee' => $booking->rentalListing->user
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500',
            'booking_id' => 'required|exists:bookings,id',
            'ratee_id' => 'required|exists:users,id'
        ]);
        $rating = Rating::create([
            'rater_id' => Auth::id(),
            'type' => 'renter',
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'ratee_id' => $validated['ratee_id']
        ]);
        $rating->ratee->notify(new NewRatingReceived($rating));

        return redirect()->route('dashboard')
            ->with('status', 'Thank you for your review!');
    }
    public function edit(Rating $rating) {}
    public function update(Request $request, Rating $rating) {}
    public function destroy(Rating $rating) {}
}
