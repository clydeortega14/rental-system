<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Support\Str;

class Shop extends Model
{
    use HasFactory, Uuid;

    protected $fillable = [
        'uuid',
        'lessor_id',
        'name',
        'description',
        'location',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    public function lessor()
    {
        return $this->belongsTo(Lessor::class);
    }

    public function rentalItems()
    {
        return $this->hasMany(RentalAddItem::class, 'shop_id');
    }
}
