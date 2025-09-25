<?php

namespace App\Http\Controllers\Lessor;

use App\Models\Shop;
use App\Models\Lessor;
use App\Models\RentalAddItem;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function index()
    {
        $lessor = Lessor::with(['shops', 'user'])
            ->where('lessoruser_id', auth()->id())
            ->first();
            
        if (!$lessor) {
            abort(403, 'Lessor not found for this user.');
        }

        return Inertia::render('Lessor/Shop', [
            'shops' => $lessor->shops,
            'lessorName' => $lessor->user->name,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'region' => 'nullable|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'barangay' => 'nullable|string',
        ]);

        $lessor = Lessor::where('lessoruser_id', Auth::id())->first();

        if (!$lessor) {
            return redirect()->back()->withErrors(['shop' => 'Lessor not registered.']);
        }

        // Directly create shop with validated data
        $lessor->shops()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'region' => $validated['region'] ?? null,
            'province' => $validated['province'] ?? null,
            'city' => $validated['city'] ?? null,
            'barangay' => $validated['barangay'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Shop saved successfully.');
    }

    public function update(Request $request, Shop $shop)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'region' => 'nullable|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'barangay' => 'nullable|string',
        ]);

        // Update shop directly with validated fields
        $shop->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'region' => $validated['region'] ?? null,
            'province' => $validated['province'] ?? null,
            'city' => $validated['city'] ?? null,
            'barangay' => $validated['barangay'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Shop updated successfully!');
    }

    public function searchShops(Request $request)
    {

        $query = RentalAddItem::with('toShop');

        // Filtered by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by item name
        if ($request->filled('query')) {
            $query->where('itemName', 'like', '%' . $request->query('query') . '%');
        }

        // Filter by store/shops
        if ($request->filled('store') && $request->store !== 'All Stores') {
            $query->whereHas('toShop', function ($q) use ($request) {
                $q->where('id', $request->store);
            });
        }

        // Filter by location
        if ($request->filled('location') && $request->location !== 'All Locations') {
            $parts = explode(',', $request->location);
            $region   = $parts[0] ?? null;
            $province = $parts[1] ?? null;
            $city     = $parts[2] ?? null;
            $barangay = $parts[3] ?? null;

            $query->whereHas('toShop', function ($q) use ($region, $province, $city, $barangay) {
                if ($region)   $q->where('region', trim($region));
                if ($province) $q->where('province', trim($province));
                if ($city)     $q->where('city', trim($city));
                if ($barangay) $q->where('barangay', trim($barangay));
            });
        }

        // Get lists
        $listings = $query->get();

        // Extract store/shops from lists
        $shops = $listings->map(fn($item) => $item->toShop)
                        ->filter()
                        ->unique('id')
                        ->values();

        // Extract locations
        $locations = $shops->map(function ($shop) {
            return implode(', ', array_filter([$shop->region, $shop->province, $shop->city, $shop->barangay]));
        })->unique()->values();

        // Recreate listings
        $listings = $listings->map(function ($item) {
            $price = is_numeric($item->price)
                        ? [
                            'hourly' => 0,
                            'daily'  => (float)$item->price,
                            'weekly' => 0,
                        ]
                        : [
                            'hourly' => 0,
                            'daily'  => 0,
                            'weekly' => 0,
                        ];

            return [
                'id'          => $item->id,
                'uuid'        => $item->uuid,
                'name'        => $item->itemName,
                'description' => $item->description,
                'category'    => $item->category,
                'price'       => $price,
                'priceUnit'   => $item->priceUnit ?? 'daily',
                'imageUrl'    => $item->imageUrl,
                'images'      => $item->images ? json_decode($item->images) : [],
                'specifications' => $item->specifications ?? [],
                'rating'      => $item->rating ?? 0,
                'reviewCount' => $item->reviewCount ?? 0,
                'location'    => $item->toShop
                                ? implode(', ', array_filter([/**$item->toShop->region,**/ $item->toShop->province, $item->toShop->city, $item->toShop->barangay]))
                                : '',
                'shop_id'     => $item->shop_id,
                'availability' => [
                    'available' => true // static for now
                ]
            ];
        });

        return response()->json([
            'listings'  => $listings,
            'shops'     => $shops,
            'locations' => $locations,
        ]);
    }

}