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
        Schema::create('library_exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->json('target_muscles');
            $table->string('difficulty');
            $table->integer('calories');
            $table->integer('duration'); // default duration in minutes
            $table->string('equipment');
            $table->json('instructions');
            $table->text('tips')->nullable();
            $table->integer('sets')->nullable();
            $table->string('reps')->nullable();
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->json('related')->nullable();
            $table->string('youtube_video_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('library_exercises');
    }
};
