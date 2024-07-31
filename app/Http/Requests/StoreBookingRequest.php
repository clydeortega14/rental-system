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
            'pick_up_date' => ['required','date'],
            'pick_up_time' => ['required', 'string'],
            'pick_up_location' => ['required', 'string'],
            'drop_off_date' => ['required', 'date'],
            'drop_off_time' => ['required', 'string']
        ];
    }
}
