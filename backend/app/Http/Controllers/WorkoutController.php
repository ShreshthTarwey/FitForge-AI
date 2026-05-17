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
}
