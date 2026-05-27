<?php

namespace App\Http\Controllers;

use App\Models\LibraryExercise;
use Illuminate\Http\Request;

class LibraryExerciseController extends Controller
{
    /**
     * Display a listing of the library exercises.
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $difficulty = $request->query('difficulty');
        $equipment = $request->query('equipment');
        $search = $request->query('search');

        $query = LibraryExercise::query();

        // category filter
        if ($category && strtolower($category) !== 'all') {
            $query->where('category', 'like', $category);
        }

        // difficulty filter
        if ($difficulty && strtolower($difficulty) !== 'all') {
            $query->where('difficulty', 'like', $difficulty);
        }

        // equipment filter
        if ($equipment && strtolower($equipment) !== 'all') {
            $query->where('equipment', 'like', '%' . $equipment . '%');
        }

        // search query filter
        if ($search) {
            $lowerSearch = '%' . strtolower($search) . '%';
            $query->where(function($q) use ($lowerSearch) {
                $q->where('name', 'like', $lowerSearch)
                  ->orWhere('category', 'like', $lowerSearch)
                  ->orWhere('equipment', 'like', $lowerSearch)
                  ->orWhere('tips', 'like', $lowerSearch);
            });
        }

        $exercises = $query->get();

        return response()->json($exercises);
    }

    /**
     * Display the specified library exercise details.
     */
    public function show($id)
    {
        $exercise = LibraryExercise::find($id);

        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found in library.'], 404);
        }

        return response()->json($exercise);
    }

    /**
     * Get unique categories list.
     */
    public function categories()
    {
        $categories = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Cardio', 'HIIT', 'Yoga', 'Full Body'];
        return response()->json($categories);
    }
}
