<?php

namespace App\Services\RentalItem;
use App\Models\RentalAddItem;
use Illuminate\Support\Facades\DB;

class RentalItemService
{

    public function getRentalItems()
    {
        return RentalAddItem::with(['attachment', 'user'])->get();
    }


    public function addItem($request)
    {
        $category_id = Category::findOrFail($request->category_id);

        DB::transaction( function () {
            try {
                $item = RentalAddItem::firstOrCreate($request->only(
                    'itemName',
                    'description',
                    'price',
                    'category_id'
                ) + [
                    'user_id' => $request->user()->id,
                    'quantity' => $request->has('quantity') ? $request->quantity : 1
                ]);

                if($request->has('customFields'))
                {
                    $item->addCustomFields($request->customFields);
                }

                // check if request has images
                if($request->hasFile('images'))
                {

                    // validate file
                    $request->validate([
                        'images.*' => 'required|mimes:jpg,jpeg,png|mimetypes:image/png,image/jpeg|max:2000'
                    ]);

                    $file = $request->file('images');
                    
                    $fileName = $this->storeFile(
                        $item, // model
                        $file, // file
                        'public', // driver
                        'images/' . $item->toCategory->name // path
                    );
                }

            } catch (\Exception $e) {
                //throw $th;

                throw new Exception($e, 500);
                
            }
        });
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