<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lessor extends Model
{
    use HasFactory;

    protected $table = 'lessors';

    protected $fillable = [
        'uuid',
        'lessorapplication_id',
        'lessoruser_id',
        'status_id',
        'approvedbyuser_id',
        'approved_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function application()
    {
        return $this->belongsTo(LessorApplication::class, 'lessorapplication_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'lessoruser_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function shops()
    {
        return $this->hasMany(Shop::class);
    }
}
