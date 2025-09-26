<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'rental_listing_id' => 'required|integer',
            'name' => 'required|string|max:50',
            'email' => 'required|string|max:50',
            'phone' => 'required|max:20',
            'billing_address.region' => 'required',
            'billing_address.province' => 'required',
            'billing_address.city' => 'required',
            'billing_address.barangay' => 'required',
            'billing_address.street' => 'required',
            'delivery_address.region' => 'required',
            'delivery_address.province' => 'required',
            'delivery_address.city' => 'required',
            'delivery_address.barangay' => 'required',
            'delivery_address.street' => 'required'
        ];
    }
}
