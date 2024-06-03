<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'attachable_id', 
        'attachable_type', 
        'display_name', 
        'filename',
        'path',
        'storage_disk',
        'type', 
        'size', 
        'size_type'
    ];

    protected $table = 'attachments';

    public function attachable() : MorphTo
    {
        return $this->morphTo();
    }

    public function getFullFileNameAttribute()
    {
        return $this->filename.'.'.$this->type;
    }
}
