<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Attachment extends Model
{
    use HasFactory, Uuid;

    protected $fillable = ['attachable_id', 'attachable_type', 'filename', 'type', 'size', 'size_type'];

    protected $table = 'attachments';

    public function attachable() : MorphTo
    {
        return $this->morphTo();
    }
}
