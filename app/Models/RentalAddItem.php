<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Uuid;
use Illuminate\Support\Str;
use App\Http\Traits\CustomFields\HasCustomFieldValues;
use App\Http\Traits\HasPolymorphicRelation;

class RentalAddItem extends Model
{
    use HasFactory, 
    Uuid, 
    HasCustomFieldValues, 
    HasPolymorphicRelation;

    protected $table = 'rental_listings';

    protected $fillable = [
        'uuid',
        'user_id', 
        'company_id',
        'itemName',
        'category',
        'description',
        'price',
        'shop_id',
        'quantity',
        'category_id'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function company()
    {
        return $this->belongsTo(UserCompanyInformation::class, 'company_id');
    }

    public function toCategory()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'rental_listing_id');
    }

    public function toShop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }
   
}
