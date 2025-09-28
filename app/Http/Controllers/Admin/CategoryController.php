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
     
        $categories = \App\Models\Category::with([
            'templateCategory', 
            'detail', 
            'custom_fields', 
            'filters', 
            'rentalItems'
        ])->get();

        return inertia('Admin/Configurations/Categories/Index', [
            'categories' => $categories,
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

         // Save template category first
        $template = TemplateCategory::create([
            'service_fee' => $validated['service_fee_value'],
            'mode_of_payment' => $validated['mode_of_payment'],
            'pricing_duration' => $validated['pricing_duration'],
        ]);

         // Handle file upload
        $imageName = null;
        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time().'_'.$file->getClientOriginalName();
            $imagePath = $file->storeAs('categories', $imageName, 'public');
        }
       
         // Save main category
        $category = Category::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'status' => 1,
            'image' => $imageName,
            'image_path' => $imagePath,
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

        // return redirect()->back()->with('success', 'Category created successfully.');
        // return redirect()->route('configurations.categories.index')->with('success', 'Category created successfully.');
        return redirect()->route('admin.configurations.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
       $category = Category::with(['templateCategory', 'detail', 'customFields', 'filters', 'rentalItems'])->findOrFail($id);
        return inertia('Admin/Configurations/Categories/Categories/CategoryEdit/Index', [
        'category' => $category,
        ]);
    }
    public function update(Request $request, $id)
    {
      
      
        $category = Category::findOrFail($id);

        $data = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'description'       => ['nullable', 'string'],
            'service_fee_value' => ['nullable', 'numeric'],
            'service_fee_type'  => ['nullable', 'string', 'in:amount,percentage'],
            'mode_of_payment'   => ['nullable', 'array'],
            'pricing_duration'  => ['nullable', 'array'],
            'custom_fields'     => ['nullable'],
            'image'             => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'],
        ]);

        // --- Update TemplateCategory ---
        $templateData = [];

        if ($request->has('service_fee_value')) {
            $templateData['service_fee'] = $data['service_fee_value'];
        }

        if ($request->has('mode_of_payment')) {
            $templateData['mode_of_payment'] = $data['mode_of_payment'];
        }

        if ($request->has('pricing_duration')) {
            $templateData['pricing_duration'] = $data['pricing_duration'];
        }

        if (!empty($templateData)) {
            $template = TemplateCategory::updateOrCreate(
                ['id' => $category->template_category_id],
                $templateData
            );

            $category->template_category_id = $template->id;
        }

        // --- Handle image upload ---
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $category->image_path = $path;
        }
        // --- Decode custom fields ---
        $customFields = [];
        if ($request->filled('custom_fields')) {
            $customFields = is_string($request->custom_fields)
                ? json_decode($request->custom_fields, true) ?? []
                : $request->custom_fields;
        }

        // --- Save/update custom fields ---
        if (!empty($customFields)) {
            // Collect IDs from request
            $requestFieldIds = collect($customFields)->pluck('id')->filter()->toArray();

            // 🔹 Remove fields that were deleted in frontend
            $category->customFields()
                ->whereNotIn('id', $requestFieldIds)
                ->delete();

            foreach ($customFields as $field) {
                if (!empty($field['id'])) {
                    // Update existing custom field
                    $existing = $category->customFields()->where('id', $field['id'])->first();

                    if ($existing) {
                        $existing->update([
                            'name'    => 'CATEGORY_' . $field['label'], // ✅ concat prefix
                            'label'   => $field['label'],
                            'type'    => $field['type'],
                            'options' => isset($field['options']) ? json_encode($field['options']) : null,
                            'slug'    => \Str::slug($field['label']),
                            'order'   => $field['order'] ?? $existing->order ?? 1,
                        ]);
                        continue;
                    }
                }

                // Otherwise create new
                $category->customFields()->create([
                    'name'           => 'CATEGORY_' . $field['label'], // ✅ concat prefix
                    'label'          => $field['label'],
                    'type'           => $field['type'],
                    'options'        => isset($field['options']) ? json_encode($field['options']) : null,
                    'slug'           => \Str::slug($field['label']),
                    'modelable_id'   => $category->id,
                    'modelable_type' => Category::class,
                    'model_type'     => 'Category', // ✅ only save "Category"
                    'order'          => $field['order'] ?? 1, // ✅ fallback order
                ]);
            }
        } else {
            // If no fields submitted, delete all custom fields for this category
            $category->customFields()->delete();
        }

        // --- Update category simple fields ---
        $category->name = $data['name'];
        $category->description = $data['description'] ?? $category->description;
        $category->save();

        return redirect()->back()->with('success', 'Category updated successfully.');
    }



}
