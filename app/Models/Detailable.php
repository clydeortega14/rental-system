<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\MorphTo;

class Detailable extends Model
{
    use HasFactory;

    protected $table = 'detailables';

    protected $fillable = [
        'detailable_type',
        'detailable_id',
        'label',
        'description',
        'active',
    ];

    public $incrementing = false;

    public $keyType = 'string';

    public function detailable() : MorphTo
    {
        return $this->morphTo();
    }
}
