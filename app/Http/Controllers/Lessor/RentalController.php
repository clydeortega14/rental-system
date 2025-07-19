<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RentalAddItem as RentalListing;
use App\Models\Category;
use App\Models\Lessor;

class RentalController extends Controller
{
    public function index()
    {
        $lessor = Lessor::with('user')
            ->where('lessoruser_id', auth()->id())
            ->first();
            
        if (!$lessor) {
            abort(403, 'Lessor not found for this user.');
        }

        $categories = Category::with('customFields')->get();

        $rentals = RentalListing::where('user_id', $lessor->user->id)->get();

        $shops = $lessor->shops()->get(['id', 'name']);

        $mappedRentals = $rentals->map(function ($rental) use ($categories, $shops) {
            return [
                'id' => $rental->id,
                'name' => $rental->itemName,
                'description' => $rental->description,
                'categoryId' => $rental->category_id,
                'categoryType' => $rental->toCategory->name,
                'reservationAmt' => $rental->price,
                'imageUrl' => $rental->imageUrl ?? '',
                'customFieldAnswers' => $rental->customFieldAnswers ?? [],
                'address' => $rental->toShop?->location ?? '',
                'shopId' => $rental->toShop?->id ?? ''
            ];
        });

        return Inertia::render('Lessor/Properties', [
            'rentals' => $mappedRentals,
            'categories' => $categories,
            'shops' => $shops,
            'lessorName' => $lessor->user->name
        ]);
    }

    public function store(Request $request)
    {

        $lessor = Lessor::with('user')
            ->where('lessoruser_id', auth()->id())
            ->first();
            
        if (!$lessor) {
            abort(403, 'Lessor not found for this user.');
        }

        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'shop_id' => 'nullable|integer|exists:shops,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
        ]);

        $listing = RentalListing::create([
            'user_id' => $lessor->user->id,
            'company_id' => $lessor->user->company->id,
            'itemName' => $validated['itemName'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'shop_id' => $validated['shop_id'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
        ]);

        if (!empty($validated['custom_fields'])) {
            $listing->addCustomFields($validated['custom_fields']);
        }

        // return redirect()->route('lessor.properties')
        //     ->with('success', 'Rental listing added!');
        return redirect()->back()->with('success', 'Rental listing added!');
    }

    public function update(Request $request, $id)
    {

        $listing = RentalListing::findOrFail($id);

        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'shop_id' => 'nullable|integer|exists:shops,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
        ]);

        if ($listing->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to update this listing.');
        }

        $listing->update([
            'itemName' => $validated['itemName'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'shop_id' => $validated['shop_id'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
        ]);

        if (!empty($validated['custom_fields'])) {
            $listing->updateCustomFields($validated['custom_fields']);
        }

        // return redirect()->route('lessor.properties')
        //     ->with('success', 'Rental listing updated!');
         return redirect()->back()->with('success', 'Rental listing updated!');
    }
}
