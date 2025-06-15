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
            $table->string('business_type')->nullable()->after('email');
            $table->string('business_reg_number')->nullable()->after('business_type');
            $table->string('business_address')->nullable()->after('business_reg_number');
            $table->string('street')->nullable()->after('business_address');
            $table->string('postal_code')->nullable()->after('street');
            $table->string('region')->nullable()->after('postal_code');
            $table->string('province')->nullable()->after('region');
            $table->string('city')->nullable()->after('province');
            $table->string('barangay')->nullable()->after('city');
            $table->string('country')->nullable()->after('barangay');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('user_company_information', function (Blueprint $table) {
            $table->dropColumn([
                'business_type',
                'business_reg_number',
                'business_address',
                'street',
                'postal_code',
                'region',
                'province',
                'city',
                'barangay',
                'country',
            ]);
        });
    }
};
