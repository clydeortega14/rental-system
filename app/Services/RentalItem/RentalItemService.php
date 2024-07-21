<?php

namespace App\Services\RentalItem;
use App\Models\RentalAddItem;

class RentalItemService
{

    public function getRentalItems()
    {
        return RentalAddItem::with(['attachment', 'user'])->get();
    }

    public function formattedRentalItems()
    {
        $rental_items = $this->getRentalItems();

        return $rental_items->map(function($rentItem, $index){

            return [

                'id' => $rentItem->uuid,
                'name' => $rentItem->itemName,
                'role' => 'View More Details',
                'category' => $rentItem->category,
                'image' => "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000"
            ];
        })->toArray();
    }
}