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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Traits\RentalItems\ItemDetails;
use App\Models\Detailable;
use App\Models\Category;
use App\Services\Category\CategoryService;
use App\Traits\RentalItems\RentalListing;


class RentalItemController extends Controller
{
    use FileTraits, ItemDetails, RentalListing;

    protected $category_service;

    public function __construct(
        
        CategoryService $category_service
    )
    {
        $this->category_service = $category_service;
    }
   
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
        // Fetch rental items along with their attachments
        $formattedRentalItems = RentalAddItem::with('attachment')->get();

        // Loop through each rental item to extract image URLs
        $rentalItems = [];
        foreach ($formattedRentalItems as $item) {
            $images = [];
            foreach ($item->attachment as $attachment) {
                $images[] = $attachment->path .'/' . $attachment->filename.'.'.$attachment->type;
            }
            $rentalItems[] = [
                'id' => $item->id,
                'itemName' => $item->itemName,
                'description' => $item->description,
                'category' => [
                    'id' => $item->toCategory->id,
                    'name' => $item->toCategory->name
                ],
                'price' => $item->price,
                'quantity' => $item->quantity,
                'quality' => $item->quality,
                'images' => $images,
               
            ];
        }
      
        // Pass the formatted rental items data to the React component using compact
        return inertia('User/Partials/Rental', [
            'rentalItems' => $rentalItems,
            'categories' => $this->category_service->getCategories()
        ]);
    }

    public function checkoutItem()
    {
        $session = request()->session()->has('booking_data') ? request()->session()->get('booking_data') : [];
        
        $serviceFee = $this->category_service->getServiceFee($session['category']['id']);

        $regions = DB::table('regions')->select('id', 'code', 'name', 'region_id')->get();

        $provinces = DB::table('provinces')->select('id', 'code', 'name', 'region_id', 'province_id')->get();

        $cities = DB::table('cities')->select('id', 'code', 'name', 'region_id', 'province_id', 'city_id')->get();

        $barangays = DB::table('barangays')->select('id', 'code', 'name', 'region_id', 'province_id', 'city_id')->get();

        return inertia('Item/Checkout', [
            'booking_data' => $session,
            'serviceFee' => $serviceFee
        ]);
    }

    public function rentalBrowserIndex($category_name)
    {
        $category = Category::with('custom_fields')->where('name', $category_name)->first();
        $modelType = $category->custom_fields->first()?->model_type;
        
        $category_custom_fields = !is_null($modelType) ? $category->getCustomFields($modelType) : [];

        if(is_null($category)) return redirect()->back()->with('error', 'Category not found!');
        
        $categories = $this->category_service->getCategories($category->id);

        $category_filters = $category->filters()
                            ->with('choices')
                            ->get()
                            ->toArray();

        $price_ranges = [];

        return inertia('Renter/RentalItemBrowser', [
            'categories' => $categories,
            'priceRanges' => $price_ranges,
            'rentalItems' => $this->getRentalItemsByCategory($category->id),
            'category_filters' => $category_filters,
            'category' => $category,
            'category_custom_fields' => $category_custom_fields
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

        $user = Auth::user();
        $userId = $user->id;
        // $user_rentalAddItems = $user->rentalAddItems();
        $category  = Category::where('name', 'cars')->first();
     
        $rentalAddItem = RentalAddItem::create([
            'user_id' => $userId,
            'itemName' => $validatedData['itemName'],
            'category' => $category->name,
            'description' => $validatedData['remarks'],
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
            'quality' => $validatedData['quality'],
            'category_id' => $category->id
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

        dd($request, $id);
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
