<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\Uuid;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, Uuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'avatar',
        'submitForm',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'active',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'active' => 'boolean',
        ];
    }


    public function company(): HasOne
    {
        return $this->hasOne(UserCompanyInformation::class, 'user_id');
    }

    public function contact()
    {
        return $this->hasOne(UserContactDetail::class, 'user_id');
    }
    
    public function signUpForm()
    {
        return $this->hasOne(SignUpForm::class, 'user_id');
    }

    public function userValidIds()
    {

        return $this->hasMany(UserValidId::class);
    }
    public function rentalAddItems(): HasMany
    {
        return $this->hasMany(RentalAddItem::class, 'user_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role',);
    }

    public function hasRole($role)
    {
        return $this->roles->contains('slug', $role);
    }

    public function hasPermission($permission)
    {
        return $this->roles->flatMap->permissions->contains('slug', $permission);
    }

    public function hasAnyPermission(array $permissions)
    {
        if (is_array($permissions)) {
            return $this->roles->flatMap->permissions->whereIn('slug', $permissions)->count() > 0;
        }
        return $this->hasPermission($permissions);
    }
    //added ratings relations
    public function givenRatings()
    {
        return $this->hasMany(Rating::class, 'rater_id');
    }

    public function receivedRatings()
    {
        return $this->hasMany(Rating::class, 'ratee_id');
    }

    public function averageRating()
    {
        return $this->receivedRatings()->avg('rating');
    }
    
}
