<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Rating;
use App\Models\RentalAddItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewRatingReceived;
use App\Enums\RatingType;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class RatingController extends Controller
{
    use AuthorizesRequests; 
    public function create(Booking $booking)
    {
        // Enhanced authorization check
        $this->authorize('createRating', $booking);

        return Inertia::render('Ratings/Create', [
            'booking' => $booking->load([
                'rentalListing.user',
                'rentalListing.ratings' => function($query) {
                    $query->latest()->limit(3);
                }
            ]),
            'averageRating' => $booking->rentalListing->averageRating(),
            'canRate' => !$booking->rentalListing->isRatedByUser(Auth::id())
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500',
            'booking_id' => 'required|exists:bookings,id',
            'rateable_type' => [
                'required', 
                Rule::in([RentalAddItem::class])
            ],
            'rateable_id' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    if (!$request->rateable_type::find($value)) {
                        $fail("Invalid rental item");
                    }
                }
            ]
        ]);

        $booking = Booking::find($validated['booking_id']);
        $rentalItem = RentalAddItem::find($validated['rateable_id']);

        // Create rating through the rental item
        $rating = $rentalItem->rate(
            stars: $validated['rating'],
            review: $validated['review'],
            bookingId: $booking->id
        );

        // Notify the item owner
        $rentalItem->owner->notify(new NewRatingReceived($rating));

            return redirect()->route('dashboard')->with('success', 'Thank you for your review!');//defaultly go to dashboard
    }

    public function edit(Rating $rating)
    {
        $this->authorize('update', $rating);

        return Inertia::render('Dashboard', [
            'ratingToEdit' => $rating // Handle editing in your existing dashboard
        ]);
    }

    public function update(Request $request, Rating $rating)
    {
        $this->authorize('update', $rating);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500'
        ]);

        $rating->update($validated);

        return back()->with('success', 'Rating updated successfully!');
    }

    public function destroy(Rating $rating)
    {
        $this->authorize('delete', $rating);
        
        $rating->delete();
        
        return back()->with('success', 'Rating deleted successfully!');
    }
}