<?php

namespace App\Http\Controllers;

use App\Traits\FileTraits;
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
use App\Traits\RentalItems\ItemDetails;
use App\Models\Detailable;



class RentalItemController extends Controller
{
    use FileTraits, ItemDetails;
   
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
        $categories  = Detailable::where('detailable_type', 'App\Models\Category')
                        ->where('active', true)
                        ->with([
                            'detailable:id,name'
                        ])
                        ->get([
                            'detailable_id',
                            'label'
                        ]);
        


        return Inertia::render('User/Partials/Rental', [
            'rentalItems' => $rentalItems, // Pass the rental items data to the React component
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

 

    public function create(Request $request) : RedirectResponse
    {
        // Validate the request data
        $validatedData = $request->validate([
            'itemName' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|string',
            'remarks' => 'required|string',
            'quantity' => 'required|integer',
            'quality' => 'required|string',
            'filename' => 'required|mimes:jpg,jpeg,png|mimetypes:image/png,image/jpeg|max:2000'
        ]);

        $user = auth()->user();
        $userId = $user->id;
        // $user_rentalAddItems = $user->rentalAddItems();
     
        $rentalAddItem = RentalAddItem::create([
            'user_id' => $userId,
            'itemName' => $validatedData['itemName'],
            'category' => $validatedData['category'],
            'description' => $validatedData['remarks'],
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
            'quality' => $validatedData['quality'],
        ]);

        // Handle the file upload and association with the RentalAddItem
        $file = $request->file('filename');
        $fileName = $this->storeFile(
            $rentalAddItem, // model
            $file, // file
            'public', // driver
            'images/' . $rentalAddItem->category // path
        );

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
