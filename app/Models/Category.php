<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use App\Http\Traits\CustomFields\HasCustomFields;

class Category extends Model
{
    use HasFactory, HasCustomFields;

    protected $table = 'categories';

    // Add new fields to fillable
    protected $fillable = ['name', 'status', 'service_fee'];

    protected $hidden = ['pivot'];

    public $timestamps = false;

    // Cast the service_fee to float
    protected $casts = [
        'service_fee' => 'float',
    ];

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }

    public function rentalItems()
    {
        return $this->hasMany(RentalAddItem::class, 'category_id');
    }

    public function filters()
    {
        return $this->belongsToMany(Filter::class, 'category_filters', 'category_id', 'filter_id');
    }

    public function custom_fields()
    {
        return $this->customFields()->orderBy('position'); // Add ordering
    }
}