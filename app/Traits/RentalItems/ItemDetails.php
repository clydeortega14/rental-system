<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;

trait ItemDetails {

    public function itemDetails($uuid)
    {
        $find_item = $this->findItem($uuid);

        

        $item_detail = [
            'uuid' => $find_item->uuid,
            'name' => $find_item->itemName,
            'description' => $find_item->description,
            'price' => $find_item->price,
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

        $rent_detail = [
            'pick_up_date' => session('booking_data.pick_up_date') ? date('D, F j, Y', strtotime(session('booking_data.pick_up_date'))) : '',
            'pick_up_time' => session('booking_data.pick_up_time') ? date('h:i A', strtotime(session('booking_data.pick_up_time')))  : '',
            'pick_up_location' => session('booking_data.pick_up_location') ?? '',
            'drop_off_date' => session('booking_data.drop_off_date') ? date('D, F j, Y', strtotime(session('booking_data.drop_off_date'))) : '',
            'drop_off_time' => session('booking_data.drop_off_time') ? date('h:i A', strtotime(session('booking_data.drop_off_time')))  : '',
            'drop_location' => session('booking_data.drop_location') ?? '',
            'rent_item' => [
                'id' => $find_item->id,
                'itemName' => $find_item->itemName,
                'description' => $find_item->description,
                'image' => config('app.url').'/storage/'.$find_item->attachment[0]->file_path
            ],
            'partial_total' => session('booking_data.partial_total') ? number_format(session('booking_data.partial_total'), 2) : '',
            'duration' => session('booking_data.duration') ?? '',
            'service_fee' => session('booking_data.service_fee') ? number_format(session('booking_data.service_fee'), 2) : '',
            'total_cost' => session('booking_data.total_cost') ? number_format(session('booking_data.total_cost'), 2) : '',
        ];
        
        return Inertia::render('Item/Checkout', [
            'item' => $find_item,
            'rent_detail' => $rent_detail
        ]);
    }

    public function findItem($uuid)
    {
        $find_item = RentalAddItem::where('uuid', $uuid)->first();

        if(is_null($find_item)) return redirect()->back()->with('error', 'Item Cannot be found!');

        return $find_item;
    }


}