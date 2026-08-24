<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;
use App\Traits\DateTraits;

trait ItemDetails {

    use DateTraits;


    public function getRentalItemsByCategory(int $categoryId)
    {
        $rental_items = RentalAddItem::where('category_id', $categoryId)->get();

        return $this->formatRentalItemsData($rental_items);
    }

    public function itemDetails($uuid)
    {
        $find_item = $this->findItem($uuid);

        if(is_null($find_item)) return back()->with('error', 'Item not found!');

        $item_detail = [
            'uuid' => $find_item->uuid,
            'name' => $find_item->itemName,
            'description' => $find_item->description,
            'default_duration' => 'daily',
            'price' => [
                'hourly' => 700,
                'daily' => (int) $find_item->price,
                'weekly' => 5000
            ],
            'specifications' => $find_item->fields->mapWithKeys(function($field){
                return [$field->customField->label => $field->defaultAnswer];
            }),
            'category' => [
                'label' => $find_item->toCategory->name,
                'id' => $find_item->toCategory->id,
                'name' => $find_item->toCategory->name
            ],
            'rating' => 4.7,
            'reviewCount' => 89,
            'location' => 'Downtown Studio',
            'src' => $find_item->attachment->map(function($item){ 
                return [
                    'name' => $item->display_name,
                    'link' => config('app.url').'/storage/'.$item->file_path
                ];
            })->all()
        ];

        return Inertia::render('Item/View', [
            'item' => $item_detail,
            'unavailable_dates' => $this->itemUnavailableDates($find_item)
        ]);
    }

    public function findItem($uuid)
    {
        $find_item = RentalAddItem::where('uuid', $uuid)->first();

        // if(is_null($find_item)) return redirect()->back()->with('error', 'Item Cannot be found!');

        $find_item->load(['toCategory']);

        return $find_item;
    }

    public function formatRentalItemsData($rental_items)
    {
        return $rental_items->map(function($rent_item){
            return [

                'id' => $rent_item->id,
                'uuid' => $rent_item->uuid,
                'name' => $rent_item->itemName,
                'description' => $rent_item->description,
                'category' => $rent_item->toCategory->name,
                'price' => [
                    'hourly' => 700,
                    'daily' => (int) $rent_item->price,
                    'weekly' => 5000
                ],
                'priceUnit' => 'daily',
                'imageUrl' => count($rent_item->attachment) > 0 ? config('app.url').'/storage/'.$rent_item->attachment[0]->file_path : '',
                'rating' => 4.8,
                'availability' => [
                    'available' => true
                ],
                'location' => 'Talisay City, Cebu' 
            ];
        });
    }
}