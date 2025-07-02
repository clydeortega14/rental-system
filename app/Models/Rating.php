<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Enums\RatingType;

class Rating extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rating',
        'review',
        'rater_id',
        'ratee_id',       // for compatibility
        'booking_id',     // context
        'type',           // enum
        'rateable_id',    // New polymorphic
        'rateable_type',  // New polymorphic
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'rating' => 'integer',
        'type' => RatingType::class,
    ];

    /**
     * Get the rateable entity (polymorphic).
     */
    public function rateable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the user who created the rating.
     */
    public function rater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rater_id');
    }

    /**
     * Get the user being rated (legacy system).
     */
    public function ratee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ratee_id');
    }

    /**
     * Get the associated booking (optional context).
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Scope for filtering by rateable type.
     */
    public function scopeWhereRateableType($query, string $type)
    {
        return $query->where('rateable_type', $type);
    }

    /**
     * Scope for filtering by rateable ID.
     */
    public function scopeWhereRateableId($query, int $id)
    {
        return $query->where('rateable_id', $id);
    }

    /**
     * Get the average rating for a rateable model.
     */
    public static function averageFor(string $rateableType, int $rateableId): float
    {
        return static::query()
            ->whereRateableType($rateableType)
            ->whereRateableId($rateableId)
            ->avg('rating') ?? 0.0;
    }

    public function rateable()
    {
        return $this->morphTo();
    }
}