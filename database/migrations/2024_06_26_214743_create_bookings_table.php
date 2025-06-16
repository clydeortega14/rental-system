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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->unsignedInteger('category_id')->references('id')->on('categories');
            $table->foreignId('rental_listing_id')->constrained();
            $table->unsignedBigInteger('booked_by')->references('id')->on('users');
            $table->unsignedSmallInteger('status')->references('id')->on('booking_statuses');
            $table->date('start_date');
            $table->time('start_time');
            $table->date('end_date');
            $table->time('end_time');
            $table->datetime('completed_at')->nullable();
            $table->decimal('partial_total', 10, 2);
            $table->integer('duration');
            $table->text('duration_type')->nullable(); // Hourly, Daily, Weekly
            $table->decimal('service_fee', 10, 2);
            $table->decimal('total_cost', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
