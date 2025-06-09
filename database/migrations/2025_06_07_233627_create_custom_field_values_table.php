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
        Schema::create('custom_field_values', function (Blueprint $table) {
            $table->id();
            $table->string('custom_field_valueable_type');
            $table->unsignedBigInteger('custom_field_valueable_id');
            $table->string('type');
            $table->boolean('boolean_answer')->nullable();
            $table->decimal('decimal_answer', 15, 2)->nullable();
            $table->text('string_answer')->nullable();
            $table->date('date_answer')->nullable();
            $table->time('time_answer')->nullable();
            $table->dateTime('date_time_answer')->nullable();
            $table->unsignedBigInteger('number_answer')->nullable();
            $table->foreignId('custom_field_id')
                ->constrained(table: 'custom_fields', indexName: 'custom_field_values_custom_field_id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_field_values');
    }
};
