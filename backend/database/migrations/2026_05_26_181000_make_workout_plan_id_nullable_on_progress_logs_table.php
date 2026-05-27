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
        Schema::table('progress_logs', function (Blueprint $table) {
            $table->foreignId('workout_plan_id')->nullable()->change();
            $table->string('custom_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('progress_logs', function (Blueprint $table) {
            $table->foreignId('workout_plan_id')->nullable(false)->change();
            $table->dropColumn('custom_name');
        });
    }
};
