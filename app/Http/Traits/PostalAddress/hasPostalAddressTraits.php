<?php


namespace App\Http\Traits\PostalAddress;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\PostalAddress;
use App\Models\AddressType;

trait hasPostalAddressTraits
{
    public function postalAddresses():MorphMany
    {
        return $this->morphMany(PostalAddress::class, 'addressable');
    }

    public function createPostalAddress(array $data):void
    {
        $postal_address = $this->postalAddresses()->updateOrCreate(
            [
                'address_type_id' => $data['address_type_id'],
            ],
            [
                'street' => $data['street'],
                'barangay_id' => $data['barangay'],
                'city_id' => $data['city'],
                'province_id' => $data['province'],
                'region_id' => $data['region']
            ]);
    }

    public function createBillingAddress(array $data)
    {
        $address_type = AddressType::withType('Billing')->first();

        if(is_null($address_type)) throw new Exception("Billing address type is not found!", 404);

        $this->createPostalAddress(['address_type_id' => $address_type->id] + $data);
    }
}