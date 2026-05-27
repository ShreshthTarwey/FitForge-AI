<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meal;
use App\Models\WaterLog;
use App\Models\SleepLog;
use Carbon\Carbon;

class NutritionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $meals = Meal::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->orderBy('created_at', 'desc')
            ->get();

        $waterIntake = WaterLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->sum('amount_ml');

        $sleepLog = SleepLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->first();

        $sleepHours = $sleepLog ? (float)$sleepLog->hours : 7.0; // Sensible standard default

        return response()->json([
            'status' => 'success',
            'meals' => $meals,
            'waterIntake' => (int)$waterIntake,
            'sleepHours' => $sleepHours,
            'waterTarget' => $user->daily_water_target ?: 3500,
            'sleepTarget' => 8.0,
            'macroTarget' => [
                'calories' => $user->daily_calorie_target ?: 2500,
                'protein' => $user->daily_protein_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.25 / 4),
                'carbs' => $user->daily_carbs_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.50 / 4),
                'fats' => $user->daily_fats_target ?: (int) (($user->daily_calorie_target ?: 2500) * 0.25 / 9)
            ]
        ]);
    }

    public function logMeal(Request $request)
    {
        $user = $request->user();
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'calories' => 'required|integer|min:0',
            'protein' => 'required|integer|min:0',
            'carbs' => 'required|integer|min:0',
            'fats' => 'required|integer|min:0',
            'meal_type' => 'required|string|in:breakfast,lunch,dinner,snack',
            'time' => 'nullable|string'
        ]);

        $meal = Meal::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'calories' => $request->calories,
            'protein' => $request->protein,
            'carbs' => $request->carbs,
            'fats' => $request->fats,
            'meal_type' => $request->meal_type,
            'time' => $request->time ?: Carbon::now()->format('h:i A'),
            'logged_at' => $today
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Meal logged successfully!',
            'meal' => $meal
        ]);
    }

    public function deleteMeal(Request $request, $id)
    {
        $user = $request->user();

        $meal = Meal::where('user_id', $user->id)->find($id);

        if (!$meal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Meal not found or unauthorized'
            ], 404);
        }

        $meal->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Meal deleted successfully!'
        ]);
    }

    public function logWater(Request $request)
    {
        $user = $request->user();
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $request->validate([
            'amount_ml' => 'required|integer|min:1|max:2000'
        ]);

        $log = WaterLog::create([
            'user_id' => $user->id,
            'amount_ml' => $request->amount_ml,
            'logged_at' => $today
        ]);

        $totalToday = WaterLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->sum('amount_ml');

        return response()->json([
            'status' => 'success',
            'message' => 'Water logged successfully!',
            'waterIntake' => (int)$totalToday
        ]);
    }

    public function resetWater(Request $request)
    {
        $user = $request->user();
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        WaterLog::where('user_id', $user->id)
            ->where('logged_at', $today)
            ->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Water intake reset successfully!',
            'waterIntake' => 0
        ]);
    }

    public function logSleep(Request $request)
    {
        $user = $request->user();
        $today = $request->header('X-User-Date') ?? Carbon::today()->toDateString();
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $today)) {
            $today = Carbon::today()->toDateString();
        }

        $request->validate([
            'hours' => 'required|numeric|min:0|max:24'
        ]);

        $sleepLog = SleepLog::updateOrCreate(
            [
                'user_id' => $user->id,
                'logged_at' => $today
            ],
            [
                'hours' => $request->hours
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Sleep hours updated successfully!',
            'sleepHours' => (float)$sleepLog->hours
        ]);
    }
}
