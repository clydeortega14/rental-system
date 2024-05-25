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
            $table->uuid('id')->primary();
        });

        Schema::create('field_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
        });

        Schema::create('form_fields', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('form_id')->constrained();
            $table->foreignUuid('data_type_id')->constrained();
            $table->foreignUuid('field_type_id')->consrained();
            $table->integer('size')->nullable();
            $table->integer('sequence');
            $table->timestamps();
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
