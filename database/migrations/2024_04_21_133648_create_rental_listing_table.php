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
        Schema::create('rental_listings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('company_id')->nullable()->constrained(table: 'user_company_information', indexName: 'rental_listings_company_id');
            $table->string('itemName');
            $table->text('description')->nullable();
            $table->boolean('isActive')->default(true);
            $table->decimal('price', 10, 2); // Adjust precision and scale as needed
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_listings');
    }
};
