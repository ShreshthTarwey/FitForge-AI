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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('daily_protein_target')->default(156);
            $table->integer('daily_carbs_target')->default(312);
            $table->integer('daily_fats_target')->default(69);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['daily_protein_target', 'daily_carbs_target', 'daily_fats_target']);
        });
    }
};
