<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
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
    // Function to format size and get size type
    private function formatSizeUnits($bytes) {
        $units = array('bytes', 'KB', 'MB', 'GB', 'TB');
        $i = 0;
        while ($bytes >= 1024) {
            $bytes /= 1024;
            $i++;
        }
        return array('size' => round($bytes, 2), 'size_type' => $units[$i]);
    }
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

       

        $image = $request->file('itemImage');
        $originalName = $image->getClientOriginalName();
        $path = $image->storeAs('images', $originalName, 'public');
        $mime = $image->getClientMimeType();
        $fileSizeData = $this->formatSizeUnits($image->getSize());
        $size = $fileSizeData['size'];
        $sizeType = $fileSizeData['size_type'];
       

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
            'image' => '/storage/'.$path,
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
       
        $item = RentalAddItem::findOrFail($id);
        return Inertia::render('User/Partials/Rental', ['item' => $item]);
     
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
        $item = RentalAddItem::findOrFail($id);

     

        // Validate the request data
        $request->validate([
            'itemName' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'quality' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
           
        ]);

      
        

        // Update the item
        $item->update([
            'itemName' => $request->itemName,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'quality' => $request->quality,
            'description' => $request->description,
            'category' => $request->category,
           
        ]);

        return redirect()->route('rentalListing', ['id' => $item->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
