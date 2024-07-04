<?php

namespace App\Http\Controllers;
use App\Models\UserCompanyInformation;
use Inertia\Inertia;

use Illuminate\Http\Request;

class RentalProviderController extends Controller
{
    public function profile($uuid)
    {
        
        $rental_provider = UserCompanyInformation::where('uuid', $uuid)->first();

        if(is_null($rental_provider)) return 'unknown rental provider';

        return Inertia::render('RentalProvider/Profile', [
            'rental_provider' => $rental_provider
        ]);
    }

    public function profileLists()
    {
        return Inertia::render('RentalProvider/ProfileList');
    }
}
