<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:6',
            'age' => 'nullable|integer',
            'gender' => 'nullable|string',
            'fitness_goal' => 'nullable|string',
            'experience_level' => 'nullable|string',
            'weekly_workout_frequency' => 'nullable|integer',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'age' => $fields['age'] ?? null,
            'gender' => $fields['gender'] ?? null,
            'fitness_goal' => $fields['fitness_goal'] ?? null,
            'experience_level' => $fields['experience_level'] ?? null,
            'weekly_workout_frequency' => $fields['weekly_workout_frequency'] ?? null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|string|email|unique:users,email,' . $user->id,
            'age' => 'nullable|integer|min:1|max:120',
            'gender' => 'nullable|string',
            'goal' => 'nullable|string',
            'height' => 'nullable|integer|min:50|max:300',
            'weight' => 'nullable|integer|min:20|max:500',
            'experience_level' => 'nullable|string',
            'weekly_workout_frequency' => 'nullable|integer|min:1|max:7',
            'daily_water_target' => 'nullable|integer|min:500|max:10000',
            'daily_calorie_target' => 'nullable|integer|min:500|max:10000',
            'daily_protein_target' => 'nullable|integer|min:10|max:1000',
            'daily_carbs_target' => 'nullable|integer|min:10|max:2000',
            'daily_fats_target' => 'nullable|integer|min:5|max:500',
            'monthly_burn_target' => 'nullable|integer|min:500|max:100000',
        ]);

        // Prevent clearing the email if it is not sent or is null
        if (empty($fields['email'])) {
            unset($fields['email']);
        }

        // Map frontend goal to backend fitness_goal column
        if (isset($fields['goal'])) {
            $fields['fitness_goal'] = $fields['goal'];
            unset($fields['goal']);
        }

        $user->update($fields);

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully!',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
