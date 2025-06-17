<?php

namespace App\Traits\RentalItems;

use App\Models\RentalAddItem;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

trait ItemDetails {


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


        $item_reserved_dates = $find_item->bookings()->select('start_date', 'end_date')->get();

        $reserved_date_periods = [];
        

        foreach($item_reserved_dates as $reserved_date)
        {
            $dates = [];

            $startDate = Carbon::parse($reserved_date->start_date);

            $endDate = Carbon::parse($reserved_date->end_date);
            
            $period = CarbonPeriod::create($startDate, $endDate);

            foreach ($period as $p_date) {
                $dates[] = $p_date->toDateString(); // format: 'Y-m-d'
                
            }
            $reserved_date_periods[] = $dates;
        }
        return Inertia::render('Item/View', [
            'item' => $item_detail,
            'unavailable_dates' => $reserved_date_periods
        ]);
    }

    public function findItem($uuid)
    {
        $find_item = RentalAddItem::where('uuid', $uuid)->first();

        // if(is_null($find_item)) return redirect()->back()->with('error', 'Item Cannot be found!');

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