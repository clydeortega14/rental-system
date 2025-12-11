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
        ];
    }
}
