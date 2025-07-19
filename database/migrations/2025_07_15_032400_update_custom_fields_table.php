<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('custom_fields', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('options');
            $table->boolean('is_required')->default(false)->after('is_active');
            $table->integer('position')->default(0)->after('is_required');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('custom_fields', function (Blueprint $table) {
            $table->dropColumn(['is_active', 'is_required', 'position']);
        });
    }
};
