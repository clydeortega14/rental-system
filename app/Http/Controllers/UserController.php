<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RentalAddItem;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Traits\FileTraits;

class UserController extends Controller
{
    use FileTraits;
    /**
     * Display the user's completing of information and contact details form.
     */

    public function index()
    {
        return Inertia::render('AccessRights/Index');
    }

    public function getUserInfoPage($uuid) : Response
    {
        $user = User::where('uuid', $uuid)->first();

        if(is_null($user)) $user = auth()->user();

        return Inertia::render('Auth/CompleteUserDetails', [
            'user' => $user
        ]);
    }

    public function store(Request $request) : RedirectResponse
    {
        $this->validateRequest($request);

        $user = User::where('id', $request->id)->first();

        if(is_null($user)){
            return redirect()->back()->with('error', 'User not found');
        }

        if($request->has('company_name') || $request->has('tin')){

            $company = $this->createUserCompanyInfo($user, $request->only(['company_name', 'tin', 'email']));
        }


        if($request->has('telephone') || $request->has('mobile')){

            $this->createUserContact($user, $request->only(['telephone', 'mobile']));
        }

        return redirect()->route('dashboard');
    }

    public function addItem(RentalAddItem $rentalAdd ,Request $request) : RedirectResponse
    {

        $user = Auth::user();
        $userId = $user->id;

        // Validate the request data
        $validatedData = $request->validate([
            'itemName' => 'required|string',
            'price' => 'required|string',
            'remarks' => 'required|string',
            'quantity' => 'required|integer',
            'quality' => 'required|string',
            'itemImage' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);

        $user = RentalAddItem::create([
            'id' => (string) Str::uuid(),
            'user_id' => $userId,
            'itemID' => (string) Str::uuid(),
            'itemName' => $validatedData['itemName'],
            'description' => $validatedData['remarks'],
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
            'quality' => $validatedData['quality'],
            'thumbnail_path' => $validatedData['itemImage'],
        ]);

       
        return redirect()->route('rentalListing');
       
    }

    public function validateRequest(Request $request)
    {
        return $request->validate([

            'company_name' => 'required|string|max:255',
            'tin' => 'required|string|max:255',
            'years_experience' => 'required',
            'mobile' => 'required'
        ]);
    }

    public function createUserCompanyInfo(User $user, array $data)
    {
        return $user->company()->create([
            'name' => $data['company_name'],
            'tin' => $data['tin'],
            'email' => $data['email']
        ]);
    }

    public function createUserContact(User $user, array $data)
    {
        return $user->contact()->firstOrCreate(
            ['telephone' => $data['telephone']],
            ['mobile' => $data['mobile']]
        );
    }
}
