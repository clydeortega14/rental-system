<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class UserValidId extends Model
{
    use HasFactory, Uuid;

    protected $table = 'user_valid_ids';

    protected $fillable = ['user_id', 'id_type'];

    public $timestamps = false;

    public function attachment()
    {
        return $this->morphOne(Attachment::class, 'attachable');
    }
}
