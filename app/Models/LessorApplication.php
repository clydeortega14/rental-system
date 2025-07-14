<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessorApplication extends Model
{
    protected $table = 'lessor_applications';

    protected $fillable = [
        'uuid',
        'encodedbyadmin_id',
        'lessoruser_id',
        'status_id',
        
        'approved_by',
        'approved_at'
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'lessoruser_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
