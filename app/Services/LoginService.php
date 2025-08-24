<?php

namespace App\Services;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rules;

class LogInService {

    public function loginWithEmail(Request $request)
    {
        $request->validate([
            // 'name' => 'required|string|max:255',
            // 'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // send email verification for 
        
    }
}