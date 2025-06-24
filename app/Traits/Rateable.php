<?php

namespace App\Traits;

use App\Models\Rating;
use App\Enums\RatingType;
use Illuminate\Support\Facades\Auth;

trait Rateable
{
    /**
     * Get all ratings for this model
     */
    public function ratings()
    {
        return $this->morphMany(Rating::class, 'rateable');
    }

    /**
     * Calculate average rating
     */
    public function averageRating(): float
    {
        return (float) $this->ratings()->avg('rating') ?? 0.0;
    }

    /**
     * Create a new rating
     */
    public function rate(int $stars, ?string $review = null, ?int $bookingId = null): Rating
    {
        return $this->ratings()->create([
            'rating' => $stars,
            'review' => $review,
            'rater_id' => Auth::id(),
            'ratee_id' => $this->getRateeId(),
            'booking_id' => $bookingId,
            'type' => $this->getRatingType()
        ]);
    }

    /**
     * Get recent ratings
     */
    public function recentRatings(int $limit = 5)
    {
        return $this->ratings()
            ->with('rater')
            ->latest()
            ->take($limit)
            ->get();
    }

    /**
     * Determine the appropriate ratee ID
     */
    protected function getRateeId(): int
    {
        if (method_exists($this, 'user_id')) {
            return $this->user_id; // For rental listings
        }
        return $this->id; // For users being rated directly
    }

    /**
     * Determine the rating type
     */
    protected function getRatingType(): string
    {
        return $this instanceof \App\Models\User
            ? RatingType::HOST_TO_RENTER->value
            : RatingType::RENTER_TO_HOST->value;
    }
}