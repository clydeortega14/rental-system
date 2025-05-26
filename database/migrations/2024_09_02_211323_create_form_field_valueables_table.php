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
        Schema::create('form_field_valueables', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('form_id')->references('id')->on('forms');
            $table->unsignedInteger('form_field_id')->references('id')->on('form_fields');
            $table->morphs('fieldable');
            $table->morphs('valueable');
            $table->unsignedBigInteger('stored_by')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_field_valueables');
    }
};
