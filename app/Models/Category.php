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

    protected $fillable = ['name'];


    protected $hidden = ['pivot'];

    public $timestamps = false;

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

    public function customFields()
    {
        return $this->hasMany(CustomField::class, 'modelable_id')->where('modelable_type', self::class);
    }
}
