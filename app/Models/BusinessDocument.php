<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessDocument extends Model
{
   use HasFactory;

    protected $fillable = [
        'company_id',
        'document_name',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
    ];

    public function company()
    {
        return $this->belongsTo(UserCompanyInformation::class, 'company_id');
    }
}
