<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Inertia\Inertia;
use App\Models\RentalAddItem as RentalListing;
use App\Models\Category;
use App\Models\Lessor;

class RentalController extends Controller
{
    public function index()
    {

        $categories = Category::with('customFields')->get();

        $rentals = RentalListing::where('user_id', auth()->id())->get();

        $shops = [];

        $isApprovedLessor = true;

        $mappedRentals = $rentals->map(function ($rental) use ($categories, $shops) {
            return [
                'id' => $rental->id,
                'uuid' => $rental->uuid,
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
            'lessorName' => auth()->user()->name,
            'isApprovedLessor' => $isApprovedLessor
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'shop_id' => 'nullable|integer|exists:shops,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
            'media.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:5120', // 5MB
            'media_paths' => 'nullable|array',
        ]);

        // Create the listing
        $listing = RentalListing::create([
            'user_id' => auth()->id(),
            'itemName' => $validated['itemName'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'shop_id' => $validated['shop_id'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
        ]);

        // Handle custom fields
        if (!empty($validated['custom_fields'])) {
            $listing->addCustomFields($validated['custom_fields']);
        }

        // Handle media uploads
        $mediaPaths = [];

        // Keep old media paths (if editing)
        if (!empty($validated['media_paths'])) {
            $mediaPaths = $validated['media_paths'];
        }

        // Handle new media
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                if (str_starts_with($file->getMimeType(), 'image/')) {
                    // Resize and compress image
                    $manager = new ImageManager(new Driver());
                    $image = $manager->read($file)
                        ->scale(width: 1200)
                        ->encodeByExtension('jpg', quality: 80);

                    $fileName = uniqid() . '.jpg';
                    $path = "rentals/{$fileName}";
                    Storage::disk('public')->put($path, (string) $image);
                    $mediaPaths[] = $path;
                } else {
                    // Store videos as-is
                    $mediaPaths[] = $file->store('rentals', 'public');
                }
            }
        }

        // Save media paths (JSON column)
        $listing->update([
            'media_paths' => $mediaPaths,
        ]);

        return redirect()->back()->with('success', 'Rental listing added!');
    }

    public function update(Request $request, $uuid)
    {

        // Validate incoming data
        $validated = $request->validate([
            'itemName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'shop_id' => 'nullable|integer|exists:shops,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'custom_fields' => 'nullable|array',
            'media_paths' => 'nullable|array', // existing media to keep
            'media' => 'nullable|array',       // new uploaded media
            'media.*' => 'file|mimes:jpg,jpeg,png,mp4|max:5120', // 5MB each
        ]);

        // Get listing by uuid
        $listing = RentalListing::where('uuid', $uuid)->firstOrFail();

        // Check authorization
        if ($listing->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to update this listing.');
        }

        // Start with existing media paths
        $finalMediaPaths = $validated['media_paths'] ?? [];

        // Handle new uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                if (str_starts_with($file->getMimeType(), 'image/')) {
                    // Resize and compress image using Intervention
                    $manager = new ImageManager(new Driver());
                    $image = $manager->read($file)
                        ->scale(width: 1200)
                        ->encodeByExtension('jpg', quality: 80);

                    $fileName = uniqid() . '.jpg';
                    $path = "rentals/{$fileName}";
                    Storage::disk('public')->put($path, (string) $image);
                    $finalMediaPaths[] = $path;

                } else {
                    // For videos, store as-is
                    $finalMediaPaths[] = $file->store('rentals', 'public');
                }
            }
        }

        // Update listing details
        $listing->update([
            'itemName' => $validated['itemName'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'shop_id' => $validated['shop_id'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'media_paths' => $finalMediaPaths,
        ]);

        // Update custom fields if any
        if (!empty($validated['custom_fields'])) {
            $listing->updateCustomFields($validated['custom_fields']);
        }

        return redirect()->back()->with('success', 'Rental listing updated successfully!');
    }

}
