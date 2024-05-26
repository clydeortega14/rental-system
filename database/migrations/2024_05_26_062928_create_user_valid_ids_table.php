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
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->contrained();
            $table->foreignUuid('id_type')->constrained();
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
