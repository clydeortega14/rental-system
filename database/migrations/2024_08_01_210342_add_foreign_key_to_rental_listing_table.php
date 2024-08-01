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
        Schema::table('rental_listings', function (Blueprint $table) {
            $table->integer('category')->unsigned()->change();
            // $table->foreign('category')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rental_listings', function (Blueprint $table) {
            // $table->integer('category')->unsigned()->change();
            // $table->dropForeign(['category']);
            $table->dropColumn('category');
        });
    }
};
