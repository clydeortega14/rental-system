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
        Schema::create('user_valid_ids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->contrained();
            $table->unsignedSmallInteger('id_type');

            $table->foreign('id_type')->references('id')->on('id_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_valid_ids');
    }
};
