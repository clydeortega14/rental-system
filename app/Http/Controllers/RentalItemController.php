<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\RentalAddItem;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class RentalItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(RentalAddItem $getItem) : Response
    {
        //
        $rentalItems = RentalAddItem::all();

        return Inertia::render('User/Partials/Rental', [
            'rentalItems' => $rentalItems // Pass the rental items data to the React component
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create(RentalAddItem $rentalAdd ,Request $request) : RedirectResponse
    {

        $user = Auth::user();
        $userId = $user->id;

        // Validate the request data
        $validatedData = $request->validate([
            'itemName' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|string',
            'remarks' => 'required|string',
            'quantity' => 'required|integer',
            'quality' => 'required|string',
            'itemImage' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);

       
        $file = $request->file('itemImage');
        $extension = $file->getClientOriginalName();
        $fileName = time().'.'.$extension;
        // $fileName = time().$request->file('itemImage')->getClientOriginalName();
        $path = 'uploads/rentItems';
        $file->move($path , $fileName);
      
       

        $user = RentalAddItem::create([
            'id' => (string) Str::uuid(),
            'user_id' => $userId,
            'itemID' => (string) Str::uuid(),
            'itemName' => $validatedData['itemName'],
            'category' => $validatedData['category'],
            'description' => $validatedData['remarks'],
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
            'quality' => $validatedData['quality'],
            'thumbnail_path' => $path.$fileName,
        ]);

       
        return redirect()->route('rentalListing');
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
