<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;

trait ItemDetails {

    public function itemDetails($uuid)
    {
        $find_item = $this->findItem($uuid);

        return Inertia::render('Item/View', ['item' => $find_item]);
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