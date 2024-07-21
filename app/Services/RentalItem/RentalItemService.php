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
            $images = [];
            foreach ($rentItem->attachment as $attachment) {
                $images[] = $attachment->path . '/' . $attachment->filename . '.' . $attachment->type;
            }
            return [

                'id' => $rentItem->uuid,
                'name' => $rentItem->itemName,
                'role' => 'View More Details',
                'category' => $rentItem->category,
                'image' =>  $images,
            ];
        })->toArray();
    }
}