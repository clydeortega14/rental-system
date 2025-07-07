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
        Schema::create('lessors', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('lessorapplication_id')->constrained('lessor_applications', 'id', 'lessors_lessorapplication_id');
            $table->foreignId('lessoruser_id')->constrained('users', 'id', 'lessors_lessoruser_id');
            $table->foreignId('status_id')->constrained('status', 'id', 'lessors_status_id');
            $table->foreignId('approvedbyuser_id')->constrained('users', 'id', 'lessors_approvedbyuser_id');
            $table->timestamp('approved_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessors');
    }
};
