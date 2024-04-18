<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function getUserInfoPage(User $user)
    {

        return Inertia::render('Auth/CompleteUserDetails', [

            'user' => $user

        ]);
    }
}
