<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressLog;
use App\Models\UserAchievement;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $totalWorkouts = ProgressLog::where('user_id', $user->id)->count();
        $caloriesBurned = ProgressLog::where('user_id', $user->id)->sum('calories_burned');
        $streakCount = $user->streak_count;
        $avatarLevel = $user->avatar_level;

        // Dummy data for charts if no real logs
        $weeklyActivity = [
            ['day' => 'Mon', 'minutes' => 30],
            ['day' => 'Tue', 'minutes' => 45],
            ['day' => 'Wed', 'minutes' => 0],
            ['day' => 'Thu', 'minutes' => 60],
            ['day' => 'Fri', 'minutes' => 30],
            ['day' => 'Sat', 'minutes' => 90],
            ['day' => 'Sun', 'minutes' => 0],
        ];

        $categoryData = [
            ['name' => 'Cardio', 'value' => 40],
            ['name' => 'Strength', 'value' => 30],
            ['name' => 'Yoga', 'value' => 20],
            ['name' => 'HIIT', 'value' => 10],
        ];

        return response()->json([
            'stats' => [
                'total_workouts' => $totalWorkouts,
                'calories_burned' => $caloriesBurned,
                'streak_count' => $streakCount,
                'avatar_level' => $avatarLevel,
            ],
            'charts' => [
                'weekly_activity' => $weeklyActivity,
                'category_distribution' => $categoryData
            ],
            'recent_workouts' => ProgressLog::with('workoutPlan')->where('user_id', $user->id)->latest()->take(3)->get(),
            'ai_tips' => "Stay hydrated! Since you did strength training recently, focus on protein intake."
        ]);
    }
}
