<?php


namespace App\Http\Traits\PostalAddress;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait hasPostalAddressTraits
{
    public function postalAddresses():MorphMany
    {
        return $this->morphMany(PostalAddress::class, 'addressable');
    }
}