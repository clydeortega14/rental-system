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
        Schema::table('shops', function (Blueprint $table) {
            // Drop old location column
            $table->dropColumn('location');

            // Add new columns
            $table->string('region')->nullable()->after('description');
            $table->string('province')->nullable()->after('region');
            $table->string('city')->nullable()->after('province');
            $table->string('barangay')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('shops', function (Blueprint $table) {
            // Restore location column
            $table->string('location', 255)->nullable()->after('description');

            // Drop the new columns
            $table->dropColumn(['region', 'province', 'city', 'barangay']);
        });
    }
};
