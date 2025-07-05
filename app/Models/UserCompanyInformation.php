<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class UserCompanyInformation extends Model
{
    use HasFactory, Uuid;

    protected $table = 'user_company_information';

    protected $fillable = [

        'id',
        'user_id',
        'name',
        'email',
        'documents_total',
        'tin',
        'business_type',
        'business_reg_number',
        'business_address',
        'street',
        'postal_code',
        'region',
        'province',
        'city',
        'barangay',
        'country',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    // ✅ Relationship: One company has many business documents
    public function documents()
    {
        return $this->hasMany(BusinessDocument::class, 'company_id');
    }
}
