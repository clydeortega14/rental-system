<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\UserCompanyInformation;
use App\Models\User;
use App\Models\UserContactDetail;

use Inertia\Inertia;
use Illuminate\Http\Request;



class LesseeController extends Controller
{
    public function index()
    {
        return Inertia::render('Lessee/Landing', [
            'auth' => [
                'user' => Auth::user()?->load(['company', 'contact']),
            ],
        ]);
    }

    public function store(Request $request)
    {
    
        $validated = $request->validate([
            'fullname' => 'required|string',
            'business_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'type' => 'nullable|string',
            'business_reg_number' => 'nullable|string',
            'business_address' => 'nullable|string',
            'street' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'region' => 'nullable|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'barangay' => 'nullable|string',
            'country' => 'nullable|string',
            'tin' => 'nullable|string',
        ]);

       

        $userId = auth()->id(); // assumes you're using auth

        // ✅ Update User model
        User::where('id', $userId)->update([
            'name' => $validated['fullname'],
            'email' => $validated['email'],
            'submitForm' => 1
        ]);

         // ✅ Update or create UserCompanyInformation
        UserCompanyInformation::updateOrCreate(
            ['user_id' => $userId],
            [
                'name' => $validated['business_name'],
                'tin' => $validated['tin'],
                'business_type' => $validated['type'],
                'business_reg_number' => $validated['business_reg_number'],
                'business_address' => $validated['business_address'],
                'street' => $validated['street'],
                'postal_code' => $validated['postal_code'],
                'region' => $validated['region'],
                'province' => $validated['province'],
                'city' => $validated['city'],
                'barangay' => $validated['barangay'],
                'country' => $validated['country'],
            ]
        );


        // ✅ Update or create UserContactInformation
        UserContactDetail::updateOrCreate(
            ['user_id' => $userId],
            ['mobile' => $validated['phone']]
        );

        return back()->with('success', 'Company information has been saved.');
    } 
}
