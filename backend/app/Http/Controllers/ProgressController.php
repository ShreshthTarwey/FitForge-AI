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
            'workout_plan_id' => 'required|exists:workout_plans,id',
            'calories_burned' => 'nullable|numeric',
            'duration_completed' => 'nullable|numeric',
            'user_feedback' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // 1. Log the workout
        $log = ProgressLog::create([
            'user_id' => $user->id,
            'workout_plan_id' => $fields['workout_plan_id'],
            'completion_date' => Carbon::now()->toDateString(),
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

        $today = Carbon::now()->startOfDay();
        
        if ($lastLog) {
            $lastDate = Carbon::parse($lastLog->completion_date)->startOfDay();
            if ($lastDate->diffInDays($today) == 1) {
                $user->streak_count += 1;
            } elseif ($lastDate->diffInDays($today) > 1) {
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
        $newAchievements = [];
        
        // Ensure some basic achievements exist
        if (Achievement::count() == 0) {
            Achievement::insert([
                ['title' => 'First Workout', 'description' => 'Completed your very first workout.', 'icon' => 'medal'],
                ['title' => '5 Workouts Completed', 'description' => 'Consistency is key.', 'icon' => 'star'],
                ['title' => '7 Day Streak', 'description' => 'You are on fire!', 'icon' => 'flame'],
            ]);
        }

        $this->checkAndUnlockAchievement($user, 'First Workout', $totalWorkouts == 1, $newAchievements);
        $this->checkAndUnlockAchievement($user, '5 Workouts Completed', $totalWorkouts == 5, $newAchievements);
        $this->checkAndUnlockAchievement($user, '7 Day Streak', $user->streak_count == 7, $newAchievements);

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
}
