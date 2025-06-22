<?php


namespace App\Http\Traits;
use App\Models\Attachment;
use App\Models\Rating;


trait HasPolymorphicRelation {

    public function rates()
    {
        return $this->morphMany(Rating::class, 'rateable');
    }

    public function attachment()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}

