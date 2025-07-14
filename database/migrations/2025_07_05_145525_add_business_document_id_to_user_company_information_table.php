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
        Schema::table('user_company_information', function (Blueprint $table) {
            $table->unsignedInteger('documents_total')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_company_information', function (Blueprint $table) {
            if (Schema::hasColumn('user_company_information', 'documents_total')) {
                $table->dropColumn('documents_total');
            }
        });
    }
};
