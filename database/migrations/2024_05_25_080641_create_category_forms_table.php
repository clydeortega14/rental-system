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
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
        });

        Schema::create('forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
        });

        Schema::create('category_forms', function (Blueprint $table) {
            $table->foreignUuid('category_id')->constrained();
            $table->foreignUuid('form_id')->constrained();

            $table->primary(['category_id', 'form_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('categories');
        Schema::dropIfExists('forms');
        Schema::dropIfExists('category_forms');
    }
};
