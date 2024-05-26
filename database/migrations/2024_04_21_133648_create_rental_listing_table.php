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
            $table->uuid('id')->primary(); // Change to bigIncrements to use auto-incrementing
            $table->foreignUuid('user_id')->constrained();
            $table->uuid('itemID')->nullable()->index();
            $table->string('itemName');
            $table->text('description');
            $table->string('category');
            $table->decimal('price', 10, 2); // Adjust precision and scale as needed
            $table->integer('quantity');
            $table->string('quality');
            $table->string('image')->nullable();
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
