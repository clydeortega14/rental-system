<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Traits\CustomFields\HasCustomFields;

class Category extends Model
{
    use HasFactory, HasCustomFields;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
        'status',
        'image',
        'image_path',
        'template_category_id',
    ];

    protected $hidden = ['pivot'];

    public $timestamps = false;

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }

    public function rentalItems():HasMany
    {
        return $this->hasMany(RentalAddItem::class, 'category_id');
    }

    public function filters():BelongsToMany
    {
        return $this->belongsToMany(Filter::class, 'category_filters', 'category_id', 'filter_id');
    }

    public function templateCategory():BelongsTo
    {
        return $this->belongsTo(TemplateCategory::class, 'template_category_id');
    }

    public function custom_fields()
    {
        return $this->customFields();
    }

}
