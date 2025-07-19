<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Routing\Controller;

class CategoryController extends Controller
{
        public function __construct()
        {
            $this->middleware('can:manage-categories')->except(['index']);
        }
    public function index()
    {
        $categories = Category::with(['detail'])->get();
        
        return Inertia::render('Category/Index', [
            'categories' => $categories
        ]);
    }

    // Add new methods for custom fields management
    public function manageCustomFields(Category $category)
    {
        return Inertia::render('Category/CustomFields', [
            'category' => $category->load('custom_fields')
        ]);
    }

    public function updateStatus(Request $request, Category $category)
    {
        $request->validate([
            'status' => 'required|in:active,inactive'
        ]);

        $category->update(['status' => $request->status]);

        return back()->with('success', 'Status updated successfully');
    }

    public function updateServiceFee(Request $request, Category $category)
    {
        $request->validate([
            'service_fee' => 'required|numeric|min:0'
        ]);

        $category->update(['service_fee' => $request->service_fee]);

        return back()->with('success', 'Service fee updated successfully');
    }
}