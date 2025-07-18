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
        Schema::create('user_kyc_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('full_name');
            $table->string('document_number')->nullable();
            $table->string('selfie_path')->nullable();
            $table->enum('kyc_status', ['Pending', 'Approved', 'Rejected', 'Incomplete'])->default('Incomplete');
            $table->timestamp('kyc_verified_at')->nullable();
            $table->boolean('kyc_verified')->default(false);

            $table->string('document_type')->nullable();
            $table->string('document_path')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_kyc_verifications');
    }
};
