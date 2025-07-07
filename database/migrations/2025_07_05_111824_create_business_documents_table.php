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
        Schema::create('business_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')
                  ->constrained('user_company_information')
                  ->onDelete('cascade');
            $table->string('document_name');
            $table->string('file_name');  
            $table->string('file_path');
            $table->string('file_type')->nullable();
            $table->unsignedBigInteger('file_size')->nullable(); // in bytes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_documents');
    }
};
