<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('ratings', function (Blueprint $table) {
            // polymorphic columns
            if (!Schema::hasColumn('ratings', 'rateable_id')) {
                $table->unsignedBigInteger('rateable_id')->nullable()->after('id');
            }
            
            if (!Schema::hasColumn('ratings', 'rateable_type')) {
                $table->string('rateable_type')->nullable()->after('rateable_id');
            }

            // booking_id nullable if it exists
            if (Schema::hasColumn('ratings', 'booking_id')) {
                $table->foreignId('booking_id')->nullable()->change();
            }

            // index only if columns it exist
            if (Schema::hasColumns('ratings', ['rateable_id', 'rateable_type'])) {
                $table->index(['rateable_id', 'rateable_type']);
            }
        });

        // This is safe for migrations it takes all your current ratings that are tied to bookings
        if (Schema::hasTable('ratings') && Schema::hasColumn('ratings', 'booking_id')) {
            DB::statement("
                UPDATE ratings 
                SET rateable_id = booking_id, 
                    rateable_type = 'App\\\\Models\\\\Booking'
                WHERE booking_id IS NOT NULL
            ");
        }
    }

    public function down()
    {
        Schema::table('ratings', function (Blueprint $table) {
            // removing index if it exists
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexes = $sm->listTableIndexes('ratings');
            
            if (array_key_exists('ratings_rateable_id_rateable_type_index', $indexes)) {
                $table->dropIndex('ratings_rateable_id_rateable_type_index');
            }

            // Dropping columns
            if (Schema::hasColumn('ratings', 'rateable_id')) {
                $table->dropColumn('rateable_id');
            }
            
            if (Schema::hasColumn('ratings', 'rateable_type')) {
                $table->dropColumn('rateable_type');
            }

            // Reverting booking_id if it exists
            if (Schema::hasColumn('ratings', 'booking_id')) {
                $table->foreignId('booking_id')->nullable(false)->change();
            }
        });
    }
};