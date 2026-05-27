<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressLog;
use App\Models\UserAchievement;
use App\Models\WaterLog;
use App\Models\SleepLog;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Respect user date header
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $totalWorkouts = ProgressLog::where('user_id', $user->id)->count();
        $caloriesBurned = ProgressLog::where('user_id', $user->id)->sum('calories_burned');
        $streakCount = $user->streak_count;
        $avatarLevel = $user->avatar_level;

        // Calculate real daily calories and workouts count for current week
        $startOfWeek = Carbon::parse($today)->startOfWeek();
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

        // Hydration Calculation
        $waterIntake = WaterLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->sum('amount_ml');
        $waterTarget = $user->daily_water_target ?: 3000;

        // Sleep Calculation
        $sleepLog = SleepLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->first();
        $sleepHours = $sleepLog ? (float) $sleepLog->hours : 7.0;

        // Fatigue and Recovery Rate Calculation
        $lastLog = ProgressLog::where('user_id', $user->id)
            ->latest('completion_date')
            ->latest('id')
            ->first();
        
        $sleepFactor = min(100.0, ($sleepHours / 8.0) * 100.0);
        
        if ($lastLog) {
            // Fatigue score: 3 (low fatigue/high recovery), 2 (medium), 1 (high fatigue/low recovery)
            $fatigueScore = $lastLog->fatigue_score ?: 2;
            $fatigueFactor = $fatigueScore == 3 ? 100.0 : ($fatigueScore == 2 ? 75.0 : 40.0);
        } else {
            $fatigueFactor = 90.0; // Rested if no logs exist
        }

        // Recovery Rate Formula: 60% Sleep Factor + 40% Muscle Fatigue Factor
        $recoveryRate = (int) (($sleepFactor * 0.6) + ($fatigueFactor * 0.4));

        return response()->json([
            'stats' => [
                'total_workouts' => $totalWorkouts,
                'calories_burned' => $caloriesBurned,
                'streak_count' => $streakCount,
                'avatar_level' => $avatarLevel,
                'today_water_intake' => (int) $waterIntake,
                'daily_water_target' => (int) $waterTarget,
                'recovery_rate' => $recoveryRate,
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
