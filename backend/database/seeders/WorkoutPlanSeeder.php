<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\WorkoutPlan;
use App\Models\Exercise;

class WorkoutPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'title' => 'Beginner Fat Loss Cardio',
                'goal' => 'Weight Loss',
                'workout_type' => 'Cardio',
                'intensity' => 'Beginner',
                'duration' => 30,
                'calories' => 300,
                'description' => 'A gentle introduction to cardio for fat loss.',
                'difficulty_score' => 3,
                'exercises' => [
                    ['name' => 'Jumping Jacks', 'sets' => 3, 'reps' => 20, 'rest' => 30, 'cals' => 50],
                    ['name' => 'High Knees', 'sets' => 3, 'reps' => 20, 'rest' => 30, 'cals' => 60],
                    ['name' => 'Mountain Climbers', 'sets' => 3, 'reps' => 15, 'rest' => 45, 'cals' => 70],
                ]
            ],
            [
                'title' => 'Advanced Strength Builder',
                'goal' => 'Muscle Gain',
                'workout_type' => 'Strength',
                'intensity' => 'Advanced',
                'duration' => 60,
                'calories' => 500,
                'description' => 'Heavy lifting for maximum muscle hypertrophy.',
                'difficulty_score' => 9,
                'exercises' => [
                    ['name' => 'Barbell Squats', 'sets' => 4, 'reps' => 8, 'rest' => 90, 'cals' => 100],
                    ['name' => 'Deadlifts', 'sets' => 4, 'reps' => 6, 'rest' => 120, 'cals' => 120],
                    ['name' => 'Bench Press', 'sets' => 4, 'reps' => 8, 'rest' => 90, 'cals' => 90],
                ]
            ],
            [
                'title' => 'HIIT Fat Burn',
                'goal' => 'Weight Loss',
                'workout_type' => 'HIIT',
                'intensity' => 'Intermediate',
                'duration' => 20,
                'calories' => 400,
                'description' => 'High intensity intervals to maximize calorie burn.',
                'difficulty_score' => 7,
                'exercises' => [
                    ['name' => 'Burpees', 'sets' => 4, 'reps' => 15, 'rest' => 20, 'cals' => 100],
                    ['name' => 'Squat Jumps', 'sets' => 4, 'reps' => 20, 'rest' => 20, 'cals' => 80],
                    ['name' => 'Plank Jacks', 'sets' => 4, 'reps' => 30, 'rest' => 20, 'cals' => 50],
                ]
            ],
            [
                'title' => 'Beginner Yoga Recovery',
                'goal' => 'Flexibility',
                'workout_type' => 'Yoga',
                'intensity' => 'Beginner',
                'duration' => 45,
                'calories' => 150,
                'description' => 'Gentle stretches to improve flexibility and aid recovery.',
                'difficulty_score' => 2,
                'exercises' => [
                    ['name' => 'Child\'s Pose', 'sets' => 1, 'reps' => 1, 'rest' => 0, 'cals' => 10],
                    ['name' => 'Downward Dog', 'sets' => 3, 'reps' => 1, 'rest' => 15, 'cals' => 20],
                    ['name' => 'Cat-Cow', 'sets' => 3, 'reps' => 10, 'rest' => 10, 'cals' => 15],
                ]
            ],
            [
                'title' => 'Muscle Gain Strength Blast',
                'goal' => 'Muscle Gain',
                'workout_type' => 'Strength',
                'intensity' => 'Intermediate',
                'duration' => 45,
                'calories' => 450,
                'description' => 'A balanced approach to building overall body strength.',
                'difficulty_score' => 6,
                'exercises' => [
                    ['name' => 'Dumbbell Lunges', 'sets' => 3, 'reps' => 12, 'rest' => 60, 'cals' => 80],
                    ['name' => 'Pull-Ups', 'sets' => 3, 'reps' => 8, 'rest' => 60, 'cals' => 60],
                    ['name' => 'Push-Ups', 'sets' => 3, 'reps' => 15, 'rest' => 60, 'cals' => 50],
                ]
            ],
            [
                'title' => 'Endurance Runner Prep',
                'goal' => 'Endurance',
                'workout_type' => 'Cardio',
                'intensity' => 'Intermediate',
                'duration' => 60,
                'calories' => 600,
                'description' => 'Aimed at improving cardiovascular endurance.',
                'difficulty_score' => 7,
                'exercises' => [
                    ['name' => 'Treadmill Jog', 'sets' => 1, 'reps' => 1, 'rest' => 0, 'cals' => 400],
                    ['name' => 'Jump Rope', 'sets' => 5, 'reps' => 100, 'rest' => 30, 'cals' => 100],
                ]
            ],
            [
                'title' => 'Core Crusher',
                'goal' => 'General Fitness',
                'workout_type' => 'Strength',
                'intensity' => 'Intermediate',
                'duration' => 15,
                'calories' => 120,
                'description' => 'Targeted core exercises for a stronger midsection.',
                'difficulty_score' => 5,
                'exercises' => [
                    ['name' => 'Crunches', 'sets' => 3, 'reps' => 20, 'rest' => 30, 'cals' => 30],
                    ['name' => 'Russian Twists', 'sets' => 3, 'reps' => 30, 'rest' => 30, 'cals' => 40],
                    ['name' => 'Plank', 'sets' => 3, 'reps' => 1, 'rest' => 30, 'cals' => 30],
                ]
            ],
            // Adding a few more to reach a reasonable pool for the demo.
            [
                'title' => 'Full Body Flexibility',
                'goal' => 'Flexibility',
                'workout_type' => 'Yoga',
                'intensity' => 'Intermediate',
                'duration' => 30,
                'calories' => 100,
                'description' => 'Improve joint mobility and full-body stretch.',
                'difficulty_score' => 4,
                'exercises' => [
                    ['name' => 'Pigeon Pose', 'sets' => 2, 'reps' => 1, 'rest' => 10, 'cals' => 10],
                    ['name' => 'Seated Forward Fold', 'sets' => 2, 'reps' => 1, 'rest' => 10, 'cals' => 10],
                    ['name' => 'Cobra Pose', 'sets' => 2, 'reps' => 1, 'rest' => 10, 'cals' => 10],
                ]
            ]
        ];

        // Let's duplicate and randomize slightly to hit 20+ records
        for ($i = 0; $i < 3; $i++) {
            foreach ($plans as $planData) {
                $exercises = $planData['exercises'];
                unset($planData['exercises']);
                
                // Add minor variation for duplicates
                if ($i > 0) {
                    $planData['title'] .= ' V' . ($i + 1);
                    $planData['duration'] += ($i * 5);
                    $planData['calories'] += ($i * 20);
                }

                $plan = WorkoutPlan::create($planData);

                foreach ($exercises as $ex) {
                    Exercise::create([
                        'workout_plan_id' => $plan->id,
                        'exercise_name' => $ex['name'],
                        'sets' => $ex['sets'],
                        'reps' => $ex['reps'],
                        'rest_time' => $ex['rest'],
                        'calories_estimate' => $ex['cals'],
                    ]);
                }
            }
        }
    }
}
