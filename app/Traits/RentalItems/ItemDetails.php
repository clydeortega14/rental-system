<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;

trait ItemDetails {

    public function itemDetails($uuid)
    {
        $find_item = $this->findItem($uuid);

        if(is_null($find_item)) return back()->with('error', 'Item not found!');

        $item_detail = [
            'uuid' => $find_item->uuid,
            'name' => $find_item->itemName,
            'description' => $find_item->description,
            'price' => [
                'hourly' => 700,
                'daily' => $find_item->price,
                'weekly' => 5000
            ],
            'specifications' => [
                'Brand' => 'Sony',
                'Model' => 'Aplha a7 III',
                'Sensor' => 'Full Frame CMOS',
                'Resolution' => '24.2 Megapixels'
            ],
            'category' => $find_item->category,
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

        return Inertia::render('Item/View', ['item' => $item_detail]);
    }

    public function findItem($uuid)
    {
        $find_item = RentalAddItem::where('uuid', $uuid)->first();

        // if(is_null($find_item)) return redirect()->back()->with('error', 'Item Cannot be found!');

        return $find_item;
    }


}