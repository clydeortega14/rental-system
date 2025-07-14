<?php

namespace App\Http\Controllers\Lessor;

use App\Models\Shop;
use App\Models\Lessor;
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

        // Combine the full location string from parts
        $locationParts = [
            $validated['barangay'] ?? null,
            $validated['city'] ?? null,
            $validated['province'] ?? null,
            $validated['region'] ?? null,
        ];

        $fullLocation = implode(', ', array_filter($locationParts));

        // Prepare data for saving, replacing location with the full combined string
        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'location' => $fullLocation,
        ];

        $lessor = Lessor::where('lessoruser_id', Auth::id())->first();
    
        if (!$lessor) {
            return redirect()->back()->withErrors(['shop' => 'Lessor not registered.']);
        }

        $lessor->shops()->create($data);

        return redirect()->back()->with('success', 'Shop saved successfully.');

    }

    public function update(Request $request, Shop $shop)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
        ]);

        $shop->update($validated);

        return redirect()->back()->with('success', 'Shop updated successfully!');
    }
}