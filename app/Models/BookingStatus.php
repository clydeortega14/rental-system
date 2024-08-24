<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingStatus extends Model
{
    use HasFactory;

    protected $table = 'booking_statuses';

    protected $fillable = ['name', 'background', 'border', 'text'];

    public $timestamps = false;

    public function getClassNameAttribute()
    {
        return $this->background.' '.$this->border.' '.$this->text;
    }
    
}
