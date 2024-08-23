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
            $table->datetime('completed_at')->nullable();
            $table->date('pick_up_date');
            $table->time('pick_up_time')->nullable();
            $table->string('pick_up_location');
            $table->date('drop_off_date');
            $table->time('drop_off_time')->nullable();
            $table->string('drop_off_location');
            $table->boolean('is_rescheduled')->default(false);
            $table->decimal('partial_total', 10, 2);
            $table->integer('duration');
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
