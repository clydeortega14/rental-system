<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;

trait ItemDetails {

    public function itemDetails($uuid)
    {
        $find_item = $this->findItem($uuid);

        

        $item_detail = [
            'name' => $find_item->itemName,
            'description' => $find_item->description,
            'src' => $find_item->attachment->map(function($item){ 
                return [
                    'name' => $item->display_name,
                    'link' => config('app.url').'/storage/'.$item->file_path
                ];
            })->all()
        ];

        return Inertia::render('Item/View', ['item' => $item_detail]);
    }

    public function checkoutItem($uuid)
    {
        $find_item = $this->findItem($uuid);

        return Inertia::render('Item/CheckoutItem', [
            'item' => $find_item
        ]);
    }

    public function findItem($uuid)
    {
        $find_item = RentalAddItem::where('uuid', $uuid)->first();

        if(is_null($find_item)) return redirect()->back()->with('error', 'Item Cannot be found!');

        return $find_item;
    }


}