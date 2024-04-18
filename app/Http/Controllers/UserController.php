<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Display the user's completing of information and contact details form.
     */
    public function getUserInfoPage(User $user) : Response
    {

        return Inertia::render('Auth/CompleteUserDetails', [

            'user' => $user

        ]);
    }

    public function store(Request $request) : RedirectResponse
    {
        $request->validate([

            'company_name' => 'required|string|max:255',
            'tin' => 'required|string|max:255',
            'years_experience' => 'required',
            'valid_id' => 'required',
            'mobile' => 'required'

        ]);


        dd($request->all());
    }
}
