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
    Route::post('/progress/log', [\App\Http\Controllers\ProgressController::class, 'logWorkout']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
