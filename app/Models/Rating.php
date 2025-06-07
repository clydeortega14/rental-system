<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\RatingType;

class Rating extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'rating', 
        'review',
        'booking_id',
        'rater_id',
        'ratee_id',
        'type'
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'rating' => 'integer',
        'type' => RatingType::class, // Enum
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'rater',
        'ratee'
    ];

    /**
     * Get the booking that owns the rating.
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class)->withDefault([
            'id' => null,
            'name' => 'Deleted Booking'
        ]);
    }

    /**
     * Get the user who created the rating.
     */
    public function rater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rater_id')->withDefault([
            'id' => null,
            'name' => 'Anonymous Rater'
        ]);
    }

    /**
     * Get the user being rated.
     */
    public function ratee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ratee_id')->withDefault([
            'id' => null,
            'name' => 'Former User'
        ]);
    }

    /**
     * Scope for ratings of a specific type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}