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
        Schema::table('postal_addresses', function (Blueprint $table) {
            $table->smallInteger('address_type_id')
                    ->unsigned()
                    ->after('addressable_id');

            $table->foreign('address_type_id')->references('id')->on('address_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('postal_addresses', function (Blueprint $table) {
            $table->dropForeign('postal_addresses_address_type_id_foreign');
            $table->dropColumn('address_type_id');
        });
    }
};
