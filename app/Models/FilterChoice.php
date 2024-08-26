<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilterChoice extends Model
{
    use HasFactory;


    protected $table = 'filter_choices';

    protected $fillable = ['filter_id', 'name'];

    public $timestamps = false;

    public function detail()
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
