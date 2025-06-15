<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = 'status';

    protected $fillable = ['name'];

    // Relationships
    public function signUpForms()
    {
        return $this->hasMany(SignUpForm::class);
    }
}
