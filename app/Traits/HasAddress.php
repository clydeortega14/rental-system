<?php

namespace App\Traits;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Yajra\Address\Entities\Barangay;
use Yajra\Address\Entities\City;
use Yajra\Address\Entities\Province;
use Yajra\Address\Entities\Region;

trait HasAddress 
{
    public function region() : MorphOne
    {
        return $this->morphOne(config('address.model.region', Region::class), 'addressable');
    }

    public function province() : MorphOne
    {
        return $this->morphOne(config('address.model.province', Province::class), 'addressable');
    }

    public function city() : MorphOne
    {
        return $this->morphOne(config('address.model.city', City::class), 'addressable');
    }
    public function barangay() : MorphOne
    {
        return $this->morphOne(config('address.model.barangay', Barangay::class), 'addressable');
    }
}