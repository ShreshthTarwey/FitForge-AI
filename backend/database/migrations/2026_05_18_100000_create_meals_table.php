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
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('calories')->default(0);
            $table->integer('protein')->default(0);
            $table->integer('carbs')->default(0);
            $table->integer('fats')->default(0);
            $table->string('meal_type')->default('breakfast'); // breakfast, lunch, dinner, snack
            $table->string('time')->nullable();
            $table->date('logged_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meals');
    }
};
