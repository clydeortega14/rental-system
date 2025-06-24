<?php

namespace App\Traits\RentalItems;

use App\Traits\Rateable;

trait RentalListing
{
    use Rateable;

    /**
     * Get cached average rating (6-hour cache)
     */
    public function cachedAverageRating()
    {
        return cache()->remember(
            "rental_item_{$this->id}_average_rating",
            now()->addHours(6),
            fn() => $this->averageRating()
        );
    }

    /**
     * Get recent approved ratings (default 5)
     */
    public function approvedRatings(int $limit = 5)
    {
        return $this->ratings()
            ->where('status', 'approved')
            ->with('rater')
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Check if specific user has rated this item
     */
    public function isRatedByUser(int $userId): bool
    {
        return $this->ratings()
            ->where('rater_id', $userId)
            ->exists();
    }
}