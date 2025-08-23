<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory, Uuid;

    protected $table = 'bookings';

    protected $fillable = [
        'uuid',
        'category_id',
        'rental_listing_id',
        'booked_by',
        'status',
        'start_date',
        'start_time',
        'end_date',
        'end_time',
        'completed_at',
        'rating_reminder_sent_at',
        'service_fee',
        'total_cost',
        'partial_total',
        'duration',
        'duration_type'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bookedBy()
    {
        return $this->belongsTo(User::class, 'booked_by');
    }

    public function rentalListing()
    {
        return $this->belongsTo(RentalAddItem::class, 'rental_listing_id');
    }
    public function bookingStatus()
    {
        return $this->belongsTo(BookingStatus::class, 'status');
    }

    public function getFormatPickUpAttribute()
    {
        return date('l, F j, Y', strtotime($this->pick_up_date));
    }
    public function getFormatDropOffAttribute()
    {
        return date('l, F j, Y', strtotime($this->drop_off_date));
    }
        public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }
}
