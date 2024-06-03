<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserValidId extends Model
{
    use HasFactory;

    protected $table = 'user_valid_ids';

    protected $fillable = ['user_id', 'id_type'];

    public $timestamps = false;

    public function attachment()
    {
        return $this->morphOne(Attachment::class, 'attachable');
    }

    public function idType()
    {
        return $this->belongsTo(IdType::class, 'id_type');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
