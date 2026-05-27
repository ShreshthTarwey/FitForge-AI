<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressLog;
use App\Models\Achievement;
use App\Models\UserAchievement;
use Carbon\Carbon;

class ProgressController extends Controller
{
    public function logWorkout(Request $request)
    {
        $user = $request->user();
        
        $fields = $request->validate([
            'workout_plan_id' => 'nullable|exists:workout_plans,id',
            'custom_name' => 'nullable|string',
            'calories_burned' => 'nullable|numeric',
            'duration_completed' => 'nullable|numeric',
            'user_feedback' => 'nullable|string',
            'notes' => 'nullable|string',
            'date' => 'nullable|date_format:Y-m-d',
        ]);

        $completionDate = $fields['date'] ?? $request->header('X-User-Date') ?? Carbon::now()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $completionDate)) {
            $completionDate = Carbon::now()->toDateString();
        }

        // 1. Log the workout
        $log = ProgressLog::create([
            'user_id' => $user->id,
            'workout_plan_id' => $fields['workout_plan_id'] ?? null,
            'custom_name' => $fields['custom_name'] ?? null,
            'completion_date' => $completionDate,
            'calories_burned' => $fields['calories_burned'] ?? 0,
            'duration_completed' => $fields['duration_completed'] ?? 0,
            'user_feedback' => $fields['user_feedback'] ?? null,
            'notes' => $fields['notes'] ?? null,
        ]);

        // 2. Streak System Logic
        $lastLog = ProgressLog::where('user_id', $user->id)
            ->where('id', '!=', $log->id)
            ->latest('completion_date')
            ->first();

        $today = Carbon::parse($completionDate)->startOfDay();
        
        if ($lastLog) {
            $lastDate = Carbon::parse($lastLog->completion_date)->startOfDay();
            $diff = $lastDate->diffInDays($today);
            if ($diff == 1) {
                $user->streak_count += 1;
            } elseif ($diff > 1) {
                $user->streak_count = 1;
            }
        } else {
            $user->streak_count = 1; // First ever workout
        }

        // 3. Avatar Progression Logic
        $totalWorkouts = ProgressLog::where('user_id', $user->id)->count();
        if ($totalWorkouts >= 50) $user->avatar_level = 'Elite';
        elseif ($totalWorkouts >= 21) $user->avatar_level = 'Advanced';
        elseif ($totalWorkouts >= 6) $user->avatar_level = 'Active';
        else $user->avatar_level = 'Beginner';

        $user->save();

        // 4. Achievement System Logic
        $newAchievements = $this->syncAchievements($user);

        // TODO: Step 15 - AI Recovery Advisor (Gemini)
        $gemini = new \App\Services\GeminiService();
        $prompt = "You are an AI Recovery Advisor. The user just completed a {$fields['duration_completed']} minute workout burning {$fields['calories_burned']} calories. Give a short 2-sentence recovery and hydration tip.";
        $aiRecoveryAdvice = $gemini->generateInsight($prompt);

        return response()->json([
            'status' => 'success',
            'message' => 'Workout logged successfully!',
            'streak' => $user->streak_count,
            'avatar_level' => $user->avatar_level,
            'new_achievements' => $newAchievements,
            'ai_recovery_advice' => $aiRecoveryAdvice
        ]);
    }

    private function checkAndUnlockAchievement($user, $title, $condition, &$newAchievements)
    {
        if ($condition) {
            $achievement = Achievement::where('title', $title)->first();
            if ($achievement) {
                $exists = UserAchievement::where('user_id', $user->id)
                    ->where('achievement_id', $achievement->id)
                    ->exists();
                if (!$exists) {
                    UserAchievement::create([
                        'user_id' => $user->id,
                        'achievement_id' => $achievement->id
                    ]);
                    $newAchievements[] = $achievement;
                }
            }
        }
    }

    private function syncAchievements($user)
    {
        // Clean up deprecated achievements
        Achievement::whereIn('title', ['First Workout', '5 Workouts Completed'])->delete();

        // 1. Ensure dynamic database achievements exist
        $achievementPresets = [
            ['title' => '7 Day Streak', 'description' => 'Log training splits 7 days in a row', 'icon' => 'flame'],
            ['title' => 'Calorie Shredder', 'description' => 'Surpass 1,000 total calories burned', 'icon' => 'trophy'],
            ['title' => 'Workout Warrior', 'description' => 'Complete your first training session', 'icon' => 'medal'],
            ['title' => 'Macro Master', 'description' => 'Log a balanced macro profile meal', 'icon' => 'award'],
            ['title' => 'Perfect Week', 'description' => 'Complete all active plans on schedule', 'icon' => 'star'],
        ];

        foreach ($achievementPresets as $preset) {
            Achievement::updateOrCreate(
                ['title' => $preset['title']],
                ['description' => $preset['description'], 'icon' => $preset['icon']]
            );
        }

        // 2. Gather progress statistics
        $totalWorkouts = ProgressLog::where('user_id', $user->id)->count();
        $totalCalories = ProgressLog::where('user_id', $user->id)->sum('calories_burned');
        $streak = $user->streak_count;
        $mealsCount = \App\Models\Meal::where('user_id', $user->id)->count();

        $startOfWeek = Carbon::now()->startOfWeek()->toDateString();
        $weeklyWorkoutsCount = ProgressLog::where('user_id', $user->id)
            ->where('completion_date', '>=', $startOfWeek)
            ->count();
        $weeklyTarget = $user->weekly_workout_frequency ?: 5;
        $completedTarget = $weeklyWorkoutsCount >= $weeklyTarget;

        $newAchievements = [];

        // 3. Evaluate and dynamically unlock achievements
        $this->checkAndUnlockAchievement($user, 'Workout Warrior', $totalWorkouts >= 1, $newAchievements);
        $this->checkAndUnlockAchievement($user, 'Calorie Shredder', $totalCalories >= 1000, $newAchievements);
        $this->checkAndUnlockAchievement($user, '7 Day Streak', $streak >= 7, $newAchievements);
        $this->checkAndUnlockAchievement($user, 'Macro Master', $mealsCount >= 1, $newAchievements);
        $this->checkAndUnlockAchievement($user, 'Perfect Week', $completedTarget, $newAchievements);

        return $newAchievements;
    }

    public function getDashboardData(Request $request)
    {
        $user = $request->user();

        // Sync achievements first so they are guaranteed up to date on dashboard load
        $this->syncAchievements($user);

        // Fetch weight history
        $logs = \App\Models\WeightLog::where('user_id', $user->id)
            ->orderBy('logged_date', 'asc')
            ->take(10)
            ->get();

        $weightHistory = [];
        foreach ($logs as $log) {
            $weightHistory[] = [
                'date' => Carbon::parse($log->logged_date)->format('M d'),
                'weight' => (float) $log->weight
            ];
        }

        // Default seeding if weight history is empty to make UI look gorgeous
        if (empty($weightHistory)) {
            $initialWeight = $user->weight ?: 80.0;
            $weightHistory = [
                ['date' => Carbon::now()->subDays(6)->format('M d'), 'weight' => $initialWeight + 1.5],
                ['date' => Carbon::now()->subDays(4)->format('M d'), 'weight' => $initialWeight + 1.0],
                ['date' => Carbon::now()->subDays(2)->format('M d'), 'weight' => $initialWeight + 0.5],
                ['date' => Carbon::now()->format('M d'), 'weight' => (float) $initialWeight]
            ];
        }

        // Fetch completed workout history
        $workoutLogs = ProgressLog::with('workoutPlan')
            ->where('user_id', $user->id)
            ->latest('completion_date')
            ->take(10)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'date' => $log->completion_date,
                    'name' => $log->workoutPlan ? $log->workoutPlan->title : ($log->custom_name ?: 'Custom Session'),
                    'duration' => $log->duration_completed,
                    'calories' => $log->calories_burned,
                    'fatigue' => $log->user_feedback ?: 'medium',
                    'notes' => $log->notes ?: 'Logged session'
                ];
            });

        // Dynamic Goal Aggregations
        $userDate = $request->header('X-User-Date') ?? Carbon::now()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $userDate)) {
            $userDate = Carbon::now()->toDateString();
        }
        $startOfWeek = Carbon::parse($userDate)->startOfWeek()->toDateString();
        $startOfMonth = Carbon::parse($userDate)->startOfMonth()->toDateString();
        $today = $userDate;

        $weeklyWorkoutsCount = ProgressLog::where('user_id', $user->id)
            ->where('completion_date', '>=', $startOfWeek)
            ->count();

        $monthlyCaloriesBurned = ProgressLog::where('user_id', $user->id)
            ->where('completion_date', '>=', $startOfMonth)
            ->sum('calories_burned');

        // Fetch daily water intake
        $dailyWater = \DB::table('water_logs')->where('user_id', $user->id)
            ->where('logged_at', $today)
            ->sum('amount_ml');

        $goals = [
            'weeklyWorkouts' => [
                'current' => $weeklyWorkoutsCount,
                'target' => $user->weekly_workout_frequency ?: 5,
                'unit' => 'sessions'
            ],
            'monthlyCalories' => [
                'current' => (int) $monthlyCaloriesBurned,
                'target' => $user->monthly_burn_target ?: 12000,
                'unit' => 'kcal'
            ],
            'waterIntake' => [
                'current' => (int) $dailyWater,
                'target' => $user->daily_water_target ?: 3500,
                'unit' => 'ml'
            ]
        ];

        // Fetch all database achievements
        $achievements = \App\Models\Achievement::all();

        // Fetch user unlocked achievement IDs
        $unlockedAchievements = \App\Models\UserAchievement::where('user_id', $user->id)
            ->pluck('achievement_id')
            ->toArray();

        return response()->json([
            'weightHistory' => $weightHistory,
            'workoutHistory' => $workoutLogs,
            'goals' => $goals,
            'currentWeight' => $user->weight ?: 80.0,
            'targetWeight' => ($user->weight ?: 80.0) - 5.0,
            'achievements' => $achievements,
            'unlockedAchievements' => $unlockedAchievements
        ]);
    }

    public function logWeight(Request $request)
    {
        $user = $request->user();
        
        $fields = $request->validate([
            'weight' => 'required|numeric|min:20|max:500',
            'date' => 'nullable|date_format:Y-m-d',
        ]);

        $today = $fields['date'] ?? $request->header('X-User-Date') ?? Carbon::now()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::now()->toDateString();
        }

        // 1. Create or Update weight log for today
        $weightLog = \App\Models\WeightLog::updateOrCreate(
            [
                'user_id' => $user->id,
                'logged_date' => $today
            ],
            [
                'weight' => $fields['weight']
            ]
        );

        // 2. Sync user profile current weight
        $user->weight = $fields['weight'];
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Weight logged successfully!',
            'weight_log' => $weightLog,
            'user_weight' => $user->weight
        ]);
    }

    public function deleteWorkoutLog(Request $request, $id)
    {
        $user = $request->user();
        $log = ProgressLog::where('user_id', $user->id)->find($id);

        if (!$log) {
            return response()->json([
                'status' => 'error',
                'message' => 'Workout log not found or unauthorized'
            ], 404);
        }

        $log->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Workout log deleted successfully!'
        ]);
    }

    public function updateWorkoutLog(Request $request, $id)
    {
        $user = $request->user();
        $log = ProgressLog::where('user_id', $user->id)->find($id);

        if (!$log) {
            return response()->json([
                'status' => 'error',
                'message' => 'Workout log not found or unauthorized'
            ], 404);
        }

        $fields = $request->validate([
            'notes' => 'nullable|string',
            'user_feedback' => 'nullable|string',
        ]);

        $log->update($fields);

        return response()->json([
            'status' => 'success',
            'message' => 'Workout log updated successfully!',
            'log' => $log
        ]);
    }
}
