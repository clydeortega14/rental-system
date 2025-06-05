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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('rating'); // at the scale 1 - 5
            $table->text('review')->nullable();
            $table->foreignId('booking_id')->constrained(); // booking or renting id
            $table->foreignId('rater_id')->constrained('users'); // who is giving the rating
            $table->foreignId('ratee_id')->constrained('users'); // who is being rated
            $table->string('type'); // renter
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }

};
