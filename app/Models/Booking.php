<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

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
        'completed_at',
        'pick_up_date',
        'pick_up_time',
        'pick_up_location',
        'drop_off_date',
        'drop_off_time',
        'drop_off_location',
        'is_rescheduled',
        
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
}
