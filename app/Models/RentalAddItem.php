<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Uuid;
use Illuminate\Support\Str;
use App\Http\Traits\CustomFields\HasCustomFieldValues;
use App\Traits\RentalItems\RentalListing;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class RentalAddItem extends Model
{
    use HasFactory, Uuid, HasCustomFieldValues, RentalListing;

    protected $table = 'rental_listings';

    protected $fillable = [
        'uuid',
        'user_id', 
        'company_id',
        'itemName',
        'category',
        'description',
        'price',
        'quantity',
        'category_id'
    ];

    protected $appends = ['average_rating', 'featured_image'];

    /**
     * Model booting
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });

        static::deleting(function ($item) {
            $item->ratings()->delete();
            $item->attachment()->delete();
        });
    }

    /**
     * Get all attachments
     */
    public function attachment()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    /**
     * Get the owner/user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the company
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(UserCompanyInformation::class, 'company_id');
    }

    /**
     * Get the category
     */
    public function toCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get featured image URL
     */
    public function getFeaturedImageAttribute(): ?string
    {
        return $this->attachment()->first()?->url;
    }

    /**
     * Get formatted average rating
     */
    public function getAverageRatingAttribute(): float
    {
        return round($this->cachedAverageRating(), 1);
    }

    /**
     * Scope for items with minimum rating
     */
    public function scopeWithMinimumRating($query, float $rating)
    {
        return $query->whereHas('ratings', function($q) use ($rating) {
            $q->selectRaw('avg(rating) as average')
              ->having('average', '>=', $rating);
        });
    }

    /**
     * Get similar rental items
     */
    public function similarItems(int $limit = 4)
    {
        return self::where('category_id', $this->category_id)
            ->where('id', '!=', $this->id)
            ->with(['attachment', 'ratings'])
            ->limit($limit)
            ->get();
    }
    public function ratings(): MorphMany
    {
        return $this->morphMany(\App\Models\Rating::class, 'rateable');
    }
}