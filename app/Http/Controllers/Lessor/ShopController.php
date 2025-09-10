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
}