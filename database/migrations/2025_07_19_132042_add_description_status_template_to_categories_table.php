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
        Schema::table('categories', function (Blueprint $table) {
             $table->text('description')->nullable()->after('name');
             $table->unsignedTinyInteger('status')
              ->nullable()
              ->after('description');
            $table->unsignedBigInteger('template_category_id')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            //
            $table->dropColumn(['description', 'status', 'template_category_id']);
        });
    }
};
