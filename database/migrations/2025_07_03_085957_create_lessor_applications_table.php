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
        Schema::create('lessor_applications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('encodedbyadmin_id')->constrained('admins', 'id', 'lessor_applications_encodedbyadmin_id')->nullable();
            $table->foreignId('lessoruser_id')->constrained('users', 'id', 'lessor_applications_lessoruser_id');
            $table->foreignId('status_id')->constrained('status', 'id', 'lessor_applications_status_id');
            $table->foreignId('approved_by')->constrained('users', 'id', 'lessor_applications_approvedby')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessor_applications');
    }
};
