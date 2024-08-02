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
            // $table->string('category')->after('description');
            // $table->unsignedInteger('category')->references('id')->on('categories')->change();
            $table->unsignedInteger('category_id')->after('description');
            $table->foreign('category_id')->references('id')->on('categories')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rental_listings', function (Blueprint $table) {
            // $table->integer('category')->unsigned()->change();
            $table->dropForeign(['category_id']);
            // $table->string('category')->change();
            
            $table->dropColumn('category_id');
        });
    }
};
