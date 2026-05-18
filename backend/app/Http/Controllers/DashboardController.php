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

        // Calculate real daily calories and workouts count for current week
        $startOfWeek = \Carbon\Carbon::now()->startOfWeek();
        $weeklyActivity = [];

        for ($i = 0; $i < 7; $i++) {
            $dateString = $startOfWeek->copy()->addDays($i)->toDateString();
            $dayName = $startOfWeek->copy()->addDays($i)->format('D'); // 'Mon', 'Tue', etc.
            
            $dayLogs = ProgressLog::where('user_id', $user->id)
                ->where('completion_date', $dateString)
                ->get();

            $weeklyActivity[] = [
                'name' => $dayName,
                'calories' => (int) $dayLogs->sum('calories_burned'),
                'workouts' => (int) $dayLogs->count()
            ];
        }

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
