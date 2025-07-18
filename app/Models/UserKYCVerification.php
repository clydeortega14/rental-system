<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserKYCVerification extends Model
{
    use HasFactory;

    protected $table = 'user_kyc_verifications';

    protected $fillable = [
        'user_id',
        'full_name',
        'document_number',
        'selfie_path',
        'kyc_status',
        'kyc_verified',
        'kyc_verified_at',
        'document_type',
        'document_path',
    ];

    protected $casts = [
        'kyc_verified_at' => 'datetime',
        'kyc_verified' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
