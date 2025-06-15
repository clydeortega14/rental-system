<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sign_up_form', function (Blueprint $table) {
            $table->id();

            // Just store UUID as a reference (no FK)
            $table->uuid('user_uuid')->nullable();
            $table->uuid('status_id')->nullable(); 
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sign_up_form');
    }
};
