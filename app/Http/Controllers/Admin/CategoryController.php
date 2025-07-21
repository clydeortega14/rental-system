<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category; 
use Illuminate\Http\Request;
use App\Models\CustomField;
use Illuminate\Support\Facades\DB;
use App\Models\TemplateCategory;
use App\Models\Detailable;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Configurations/Categories/Index', [
            'categories' => \App\Models\Category::all(),
        ]);
    }
    public function create(Request $request)
    {
        return inertia('Admin/Configurations/Categories/CreateCategory');
    }
    public function store(Request $request)
    {
         // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'service_fee_value' => 'required|numeric',
            'service_fee_type' => 'required|string|in:amount,percentage',
            'mode_of_payment' => 'required|array',
            'pricing_duration' => 'required|array',
            'custom_fields' => 'nullable|array',
            'detail_active' => 'nullable|boolean',
        ]);

         // Save template category first
        $template = TemplateCategory::create([
            'service_fee' => $validated['service_fee_value'],
            'mode_of_payment' => $validated['mode_of_payment'],
            'pricing_duration' => $validated['pricing_duration'],
        ]);

         // Save main category
        $category = Category::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'template_category_id' => $template->id,
        ]);

        // Save the detailable entry
        $category->detail()->create([
            'label' => $validated['name'], // or another label
            'description' => $validated['description'] ?? null,
            'active' => $validated['detail_active'] ?? true,
        ]);

        // Save custom fields if present
        if (!empty($validated['custom_fields'])) {
            foreach ($validated['custom_fields'] as $field) {
                $category->createCustomField([
                    'label' => $field['label'],
                    'type' => $field['type'],
                    'options' => $field['options'] ?? [],
                    'slug' => \Str::slug($field['label']),
                    'model_type' => Category::class,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        return inertia('Admin/Configurations/Categories/Categories/CategoryEdit', [
            'id' => $id
        ]);
    }

}
