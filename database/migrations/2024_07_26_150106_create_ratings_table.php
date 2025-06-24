<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // First create the table if it doesn't exist
        if (!Schema::hasTable('ratings')) {
            Schema::create('ratings', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('rateable_id')->nullable();
                $table->string('rateable_type')->nullable();
                
                // Add booking_id if it's part of your initial structure
                $table->foreignId('booking_id')->nullable()->constrained()->nullOnDelete();
                
                // Other columns you might need
                $table->integer('rating');
                $table->text('comment')->nullable();
                $table->timestamps();
                
                // Indexes
                $table->index(['rateable_id', 'rateable_type']);
            });
        } else {
            // Only alter the table if it exists
            Schema::table('ratings', function (Blueprint $table) {
                if (!Schema::hasColumn('ratings', 'rateable_id')) {
                    $table->unsignedBigInteger('rateable_id')->nullable()->after('id');
                }
                
                if (!Schema::hasColumn('ratings', 'rateable_type')) {
                    $table->string('rateable_type')->nullable()->after('rateable_id');
                }

                // Convert existing booking relationships to polymorphic
                if (Schema::hasColumn('ratings', 'booking_id')) {
                    DB::statement("
                        UPDATE ratings 
                        SET rateable_id = booking_id, 
                            rateable_type = 'App\\\\Models\\\\Booking'
                        WHERE booking_id IS NOT NULL
                    ");
                }
                
                // Add index if columns exist
                if (Schema::hasColumns('ratings', ['rateable_id', 'rateable_type'])) {
                    $table->index(['rateable_id', 'rateable_type']);
                }
            });
        }
    }

    public function down()
    {
        // Don't drop the entire table in down() - just reverse the alterations
        Schema::table('ratings', function (Blueprint $table) {
            // Remove index if it exists
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexes = $sm->listTableIndexes('ratings');
            
            if (array_key_exists('ratings_rateable_id_rateable_type_index', $indexes)) {
                $table->dropIndex('ratings_rateable_id_rateable_type_index');
            }

            // Remove polymorphic columns if they exist
            if (Schema::hasColumn('ratings', 'rateable_id')) {
                $table->dropColumn('rateable_id');
            }
            
            if (Schema::hasColumn('ratings', 'rateable_type')) {
                $table->dropColumn('rateable_type');
            }
        });
        
        // Note: We don't drop the entire table here to prevent data loss
    }
};