<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Uuid;
use Illuminate\Support\Str;
use App\Http\Traits\CustomFields\HasCustomFieldValues;


class RentalAddItem extends Model
{
    use HasFactory, Uuid, HasCustomFieldValues;

    protected $table = 'rental_listings';

    protected $fillable = [
        'user_id', 
        'itemName', 
        'category',
        'description',
        'price',
        'quantity',
        'category_id'
    ];
    
    public function attachment()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function toCategory()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
   
}
