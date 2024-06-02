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
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('attachable_type');
            $table->bigInteger('attachable_id')->unsigned();
            $table->string('display_name');
            $table->string('filename')->unique();
            $table->string('path');
            $table->string('storage_disk');
            $table->string('type');
            $table->decimal('size', 18, 2);
            $table->string('size_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
