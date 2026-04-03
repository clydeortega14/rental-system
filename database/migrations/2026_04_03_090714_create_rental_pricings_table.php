<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rental_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_item_id')->constrained(table: 'rental_listings', indexName: 'rental_pricings_rental_item_id')->cascadeOnDelete();
            $table->decimal('price_per_unit', 15, 2);
            $table->enum('price_unit', ['hour', 'day', 'week', 'month']);
            $table->decimal('security_deposit')->nullable();
            $table->string('currency')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_pricings');
    }
};
