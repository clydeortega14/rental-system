<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    use HasFactory;

    protected $table = 'filters';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function detail()
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }

    public function choices()
    {
        return $this->hasMany(FilterChoice::class, 'filter_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_filters', 'filter_id', 'category_id');
    }
}
