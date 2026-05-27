<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressLog;
use App\Models\Meal;
use App\Models\WaterLog;
use App\Models\SleepLog;
use App\Models\WorkoutPlan;
use App\Services\GeminiService;
use Carbon\Carbon;

class AICoachController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array',
            'history.*.sender' => 'required|string|in:user,bot',
            'history.*.text' => 'required|string',
        ]);

        $user = $request->user();
        $userMessage = $request->input('message');
        $chatHistory = $request->input('history', []);

        // 1. Gather profile context
        $profile = [
            'name' => $user->name,
            'email' => $user->email,
            'age' => $user->age ?? 'Not specified',
            'gender' => $user->gender ?? 'Not specified',
            'fitness_goal' => $user->fitness_goal ?? 'General Fitness',
            'experience_level' => $user->experience_level ?? 'Beginner',
            'height' => $user->height ? $user->height . ' cm' : 'Not specified',
            'weight' => $user->weight ? $user->weight . ' kg' : 'Not specified',
            'streak_count' => $user->streak_count,
            'avatar_level' => $user->avatar_level,
        ];

        // 2. Gather today's metrics
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $meals = Meal::where('user_id', $user->id)->where('logged_at', $today)->get();
        $caloriesConsumed = $meals->sum('calories');
        $proteinConsumed = $meals->sum('protein');
        $carbsConsumed = $meals->sum('carbs');
        $fatsConsumed = $meals->sum('fats');

        $waterIntake = WaterLog::where('user_id', $user->id)->where('logged_at', $today)->sum('amount_ml');

        $sleepLog = SleepLog::where('user_id', $user->id)->where('logged_at', $today)->first();
        $sleepHours = $sleepLog ? (float)$sleepLog->hours : 'Not logged today';

        // Targets
        $targets = [
            'calories' => $user->daily_calorie_target ?: 2500,
            'protein' => $user->daily_protein_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.25 / 4),
            'carbs' => $user->daily_carbs_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.50 / 4),
            'fats' => $user->daily_fats_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.25 / 9),
            'water' => $user->daily_water_target ?: 3500,
            'sleep' => 8.0,
        ];

        // Today's active workout totals
        $todayWorkouts = ProgressLog::where('user_id', $user->id)->where('completion_date', $today)->get();
        $todayCaloriesBurned = $todayWorkouts->sum('calories_burned');
        $todayWorkoutDuration = $todayWorkouts->sum('duration_completed');

        // 3. Gather recent workouts
        $recentWorkoutLogs = ProgressLog::with('workoutPlan')
            ->where('user_id', $user->id)
            ->latest('completion_date')
            ->latest('id')
            ->take(3)
            ->get()
            ->map(function ($log) {
                return [
                    'date' => $log->completion_date,
                    'title' => $log->workoutPlan ? $log->workoutPlan->title : ($log->custom_name ?? $log->workout_name ?? 'Custom Session'),
                    'duration' => $log->duration_completed . ' mins',
                    'calories_burned' => $log->calories_burned . ' kcal',
                    'fatigue_level' => $log->fatigue_score == 1 ? 'High' : ($log->fatigue_score == 2 ? 'Medium' : 'Low'),
                    'notes' => $log->notes ?? 'No notes',
                ];
            });

        // 4. Construct Prompt
        $prompt = "You are the FitForge AI Coach, a highly motivational, premium, and friendly neural fitness advisor inside the FitForge AI web application. ";
        $prompt .= "You provide personalized advice based on the user's specific real-time biometrics, targets, and logs. ";
        $prompt .= "Format your response naturally and conversationally. Keep it concise (2-4 sentences max), direct, and highly actionable. Don't use placeholders, system tags, or say you are an AI model unless asked.\n\n";

        $prompt .= "### USER PROFILE:\n";
        $prompt .= "- Name: {$profile['name']}\n";
        $prompt .= "- Age/Gender: {$profile['age']} / {$profile['gender']}\n";
        $prompt .= "- Height/Weight: {$profile['height']} / {$profile['weight']}\n";
        $prompt .= "- Fitness Goal: {$profile['fitness_goal']}\n";
        $prompt .= "- Experience Level: {$profile['experience_level']}\n";
        $prompt .= "- Current Streak: {$profile['streak_count']} days (Level: {$profile['avatar_level']})\n\n";

        $prompt .= "### DAILY TARGETS:\n";
        $prompt .= "- Food Calorie Intake Goal: {$targets['calories']} kcal\n";
        $prompt .= "- Macro Intake Goals: Protein: {$targets['protein']}g, Carbs: {$targets['carbs']}g, Fats: {$targets['fats']}g\n";
        $prompt .= "- Water Hydration Goal: {$targets['water']} ml\n";
        $prompt .= "- Sleep Hygiene Goal: {$targets['sleep']} hours\n\n";

        $prompt .= "### TODAY'S ACTIVE & NUTRITION LOGS (Date: {$today}):\n";
        $prompt .= "- Food Calorie Intake (Calories Consumed Today from food/meals): {$caloriesConsumed} kcal\n";
        $prompt .= "- Macros Consumed Today: Protein: {$proteinConsumed}g, Carbs: {$carbsConsumed}g, Fats: {$fatsConsumed}g\n";
        $prompt .= "- Water Drunk Today: {$waterIntake} ml\n";
        $prompt .= "- Sleep Logged Today: {$sleepHours} hours\n";
        $prompt .= "- Active Workout Calories Burned Today: {$todayCaloriesBurned} kcal (This is calorie burn/energy expenditure, NOT intake!)\n";
        $prompt .= "- Active Workout Duration Today: {$todayWorkoutDuration} minutes\n\n";

        $prompt .= "### RECENT WORKOUT HISTORY LOGS:\n";
        if ($recentWorkoutLogs->isEmpty()) {
            $prompt .= "No workouts logged recently. Encourage them to start a workout plan!\n\n";
        } else {
            foreach ($recentWorkoutLogs as $w) {
                $prompt .= "- Date: {$w['date']} | Title: {$w['title']} | Duration: {$w['duration']} | Workout Calories Burned: {$w['calories_burned']} (Energy Expended) | Fatigue: {$w['fatigue_level']} | Notes: {$w['notes']}\n";
            }
            $prompt .= "\n";
        }

        $prompt .= "### CHAT HISTORY:\n";
        foreach ($chatHistory as $chat) {
            $roleName = $chat['sender'] === 'user' ? 'User' : 'Coach';
            $prompt .= "{$roleName}: {$chat['text']}\n";
        }
        $prompt .= "\n";

        $prompt .= "### CURRENT USER MESSAGE:\n";
        $prompt .= "User: {$userMessage}\n\n";
        $prompt .= "IMPORTANT SAFETY CHECK: Do not confuse Calories Consumed (food eaten, currently {$caloriesConsumed} kcal today) with Workout Calories Burned (exercise burn, currently {$todayCaloriesBurned} kcal today). If the user asks about workouts, discuss their active calorie burn and duration. If they ask about food, discuss their calorie intake. Do not state that they burned their food intake value.\n\n";
        $prompt .= "### COACH RESPONSE:";

        // Call Gemini Service
        $responseMessage = $this->geminiService->generateInsight($prompt);

        return response()->json([
            'status' => 'success',
            'reply' => $responseMessage,
        ]);
    }
}
