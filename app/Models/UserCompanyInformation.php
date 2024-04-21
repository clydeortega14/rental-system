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
        'tin'

    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
