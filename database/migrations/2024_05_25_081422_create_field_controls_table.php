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
        Schema::create('data_types', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name');
        });

        Schema::create('field_types', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name');
        });

        Schema::create('form_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string('label');
            $table->string('name');
            $table->unsignedInteger('form_id');
            $table->unsignedSmallInteger('data_type_id');
            $table->unsignedSmallInteger('field_type_id');
            $table->integer('size')->nullable();
            $table->integer('sequence');
            $table->timestamps();

            $table->foreign('form_id')->references('id')->on('forms');
            $table->foreign('data_type_id')->references('id')->on('data_types');
            $table->foreign('field_type_id')->references('id')->on('field_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('form_fields', function (Blueprint $table) {
        //     $table->dropForeign(['data_type_id']);
        //     $table->dropForeign(['field_type_id']);
        // });

        Schema::disableForeignKeyConstraints();


        Schema::dropIfExists('data_types');
        Schema::dropIfExists('field_types');
        Schema::dropIfExists('form_fields');
    }
};
