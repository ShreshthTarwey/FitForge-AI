<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
    Route::post('/workout/generate', [\App\Http\Controllers\WorkoutController::class, 'generate']);
    Route::get('/workouts', [\App\Http\Controllers\WorkoutController::class, 'index']);
    Route::get('/workouts/{id}', [\App\Http\Controllers\WorkoutController::class, 'show']);
    Route::post('/progress/log', [\App\Http\Controllers\ProgressController::class, 'logWorkout']);
    Route::delete('/progress/log/{id}', [\App\Http\Controllers\ProgressController::class, 'deleteWorkoutLog']);
    Route::put('/progress/log/{id}', [\App\Http\Controllers\ProgressController::class, 'updateWorkoutLog']);
    Route::get('/progress/dashboard', [\App\Http\Controllers\ProgressController::class, 'getDashboardData']);
    Route::post('/progress/weight', [\App\Http\Controllers\ProgressController::class, 'logWeight']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    // Nutrition & Hydration API Routes
    Route::get('/nutrition', [\App\Http\Controllers\NutritionController::class, 'index']);
    Route::post('/nutrition/meal', [\App\Http\Controllers\NutritionController::class, 'logMeal']);
    Route::delete('/nutrition/meal/{id}', [\App\Http\Controllers\NutritionController::class, 'deleteMeal']);
    Route::post('/nutrition/water', [\App\Http\Controllers\NutritionController::class, 'logWater']);
    Route::post('/nutrition/water/reset', [\App\Http\Controllers\NutritionController::class, 'resetWater']);
    Route::post('/nutrition/sleep', [\App\Http\Controllers\NutritionController::class, 'logSleep']);

    // AI Coach Chat Route
    Route::post('/ai/chat', [\App\Http\Controllers\AICoachController::class, 'chat']);

    // Exercise Library Routes
    Route::get('/exercises', [\App\Http\Controllers\LibraryExerciseController::class, 'index']);
    Route::get('/exercises/categories', [\App\Http\Controllers\LibraryExerciseController::class, 'categories']);
    Route::get('/exercises/{id}', [\App\Http\Controllers\LibraryExerciseController::class, 'show']);
});
