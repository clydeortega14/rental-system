<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class PostalAddress extends Model
{
    use HasFactory;

    protected $table = 'postal_address';
    protected $fillable = [
        'addressable_type',
        'addressable_type',
        'address_type_id',
        'street',
        'barangay_id',
        'city_id',
        'province_id',
        'region_id',
    ];

    public function addressType():BelongsTo
    {
        return $this->belongsTo(AddressType::class, 'address_type_id');
    }

    public function barangay():BelongsTo
    {
        return $this->belongsTo(Barangay::class, 'barangay_id');
    }

    public function city():BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function province():BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id');
    }

    public function region():BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function addressable():MorphTo
    {
        return $this->morphTo();
    }
}
