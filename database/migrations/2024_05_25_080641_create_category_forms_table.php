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
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('forms', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedSmallInteger('form_type_id');
            $table->string('name');
            
            $table->foreign('form_type_id')->references('id')->on('form_types');
        });

        Schema::create('category_forms', function (Blueprint $table) {
            $table->unsignedInteger('category_id')->references('id')->on('categories');
            $table->unsignedInteger('form_id')->references('id')->on('forms');

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
