<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SignUpForm extends Model
{
    use HasFactory;

    protected $table = 'sign_up_form';

    protected $fillable = [
        'user_uuid',
        'status_id',
    ];

    /**
     * Relationship: SignUpForm belongs to a User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: SignUpForm belongs to a Status
     */
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
