<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\Uuid;
use App\Models\Lessor;
use App\Http\Traits\PostalAddress\hasPostalAddressTraits;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, Uuid, hasPostalAddressTraits;

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
        'provider',
        'provider_id',
        'email_verified_at',
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

    public function contact() : HasOne
    {
        return $this->hasOne(UserContactDetail::class, 'user_id');
    }

    public function billingAddress() : HasOne
    {
        return $this->hasOne(UserBillingAddress::class, 'user_id');
    }
    public function cardDetail() : HasOne
    {
        return $this->hasOne(UserCardDetail::class, 'user_id');
    }

    public function signUpForm() : HasOne
    {
        return $this->hasOne(SignUpForm::class, 'user_uuid', 'uuid');
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


    public function getBarangayStreetAttribute()
    {
        return $this->company()->street.', '.$this->company()->barangay;
    }

    public function lessorApplication()
    {
        return $this->hasOne(LessorApplication::class, 'lessoruser_id');
    }

    public function kyc()
    {
        return $this->hasOne(UserKYCVerification::class);
    }
    public function lessor()
    {
        return $this->hasOne(Lessor::class, 'lessoruser_id');
    }


    public function shops()
    {
        return $this->hasManyThrough(
            Shop::class,   // Final model
            Lessor::class, // Intermediate model
            'lessoruser_id', // Foreign key on lessors table
            'lessor_id',     // Foreign key on shops table
            'id',            // Local key on users table
            'id'             // Local key on lessors table
        );
    }

}
