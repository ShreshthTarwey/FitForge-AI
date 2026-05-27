<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutPlan;

class WorkoutController extends Controller
{
    public function generate(Request $request)
    {
        $goal = $request->input('goal');
        $type = $request->input('workout_type');
        $intensity = $request->input('intensity');
        $duration = $request->input('duration'); // in minutes

        // Basic query
        $query = WorkoutPlan::with('exercises');

        if ($goal) $query->where('goal', $goal);
        if ($type) $query->where('workout_type', $type);
        if ($intensity) $query->where('intensity', $intensity);
        
        // Filter by duration within a range (e.g., +- 15 mins)
        if ($duration) {
            $query->whereBetween('duration', [$duration - 15, $duration + 15]);
        }

        $plan = $query->inRandomOrder()->first();

        // If no exact match, relax the duration constraint
        if (!$plan) {
            $plan = WorkoutPlan::with('exercises')
                ->where('goal', $goal)
                ->where('workout_type', $type)
                ->inRandomOrder()
                ->first();
        }

        // If still no match, just return a random one as fallback
        if (!$plan) {
            $plan = WorkoutPlan::with('exercises')->inRandomOrder()->first();
        }

        // Duplicate and save for this user as an AI generated plan
        $user = $request->user();
        if ($user && $plan) {
            $aiPlan = WorkoutPlan::create([
                'title' => 'AI Generated: ' . $plan->title,
                'goal' => $plan->goal,
                'workout_type' => $plan->workout_type,
                'intensity' => $plan->intensity,
                'duration' => $plan->duration,
                'calories' => $plan->calories,
                'description' => $plan->description,
                'difficulty_score' => $plan->difficulty_score,
                'image_url' => $plan->image_url,
                'user_id' => $user->id,
                'is_generated' => true
            ]);

            foreach ($plan->exercises as $exercise) {
                \App\Models\Exercise::create([
                    'workout_plan_id' => $aiPlan->id,
                    'exercise_name' => $exercise->exercise_name,
                    'sets' => $exercise->sets,
                    'reps' => $exercise->reps,
                    'rest_time' => $exercise->rest_time,
                    'calories_estimate' => $exercise->calories_estimate
                ]);
            }

            $plan = $aiPlan->load('exercises');
        }

        // TODO: In Step 14, we will enhance this output with Gemini AI
        $gemini = new \App\Services\GeminiService();
        $prompt = "You are an AI Fitness Coach. The user selected a {$plan->intensity} {$plan->workout_type} workout for {$plan->goal} lasting {$plan->duration} minutes. Give a short, 2-sentence motivational insight and warm-up advice.";
        $ai_insights = $gemini->generateInsight($prompt);

        return response()->json([
            'status' => 'success',
            'plan' => $plan,
            'ai_insights' => $ai_insights
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $type = $request->query('workout_type');
        
        $query = WorkoutPlan::with('exercises')
            ->where(function($q) use ($user) {
                $q->whereNull('user_id');
                if ($user) {
                    $q->orWhere('user_id', $user->id);
                }
            });

        if ($type) {
            // Map common frontend category names to seeder workout_type
            if (stripos($type, 'Strength') !== false) {
                $query->where('workout_type', 'Strength');
            } elseif (stripos($type, 'HIIT') !== false) {
                $query->where('workout_type', 'HIIT');
            } elseif (stripos($type, 'Yoga') !== false) {
                $query->where('workout_type', 'Yoga');
            } elseif (stripos($type, 'Cardio') !== false) {
                $query->where('workout_type', 'Cardio');
            } else {
                $query->where('workout_type', $type);
            }
        }

        $plans = $query->latest()->get();
        return response()->json($plans);
    }

    public function show($id)
    {
        $plan = WorkoutPlan::with('exercises')->find($id);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        return response()->json($plan);
    }
}
