<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RentalAddItem as RentalListing;
use App\Models\Category;

class RentalController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Lessor/Properties', [
            'rentals' => RentalListing::where('user_id', $user->id)->get(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|integer',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
        ]);

        $listing = new RentalListing([
            'itemName' => $validated['itemName'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
        ]);
        $listing->user_id = Auth::id();
        $listing->company_id = Auth::user()->company->id;
        $listing->save();

        if (!empty($validated['custom_fields'])) {
            $listing->addCustomFields($validated['custom_fields']);
        }

        return redirect()->back()->with('success', 'Rental listing added!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|integer',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
        ]);

        $listing = RentalListing::findOrFail($id);

        if ($listing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this listing.');
        }

        $listing->itemName = $validated['itemName'];
        $listing->description = $validated['description'];
        $listing->category_id = $validated['category_id'];
        $listing->price = $validated['price'];
        $listing->quantity = $validated['quantity'];
        $listing->save();

        if (!empty($validated['custom_fields'])) {
            $listing->updateCustomFields($validated['custom_fields']);
        }

        return redirect()->back()->with('success', 'Rental listing updated!');
    }

}
