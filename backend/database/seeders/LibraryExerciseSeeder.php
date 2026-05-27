<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LibraryExercise;

class LibraryExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate existing entries to avoid duplicates on re-seed
        LibraryExercise::truncate();

        $exercises = [
            // Chest Exercises
            [
                'id' => 1,
                'name' => 'Incline Dumbbell Bench Press',
                'category' => 'Chest',
                'target_muscles' => ['Upper Chest', 'Front Delts'],
                'difficulty' => 'Intermediate',
                'calories' => 120,
                'duration' => 10,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Lie on an incline bench set to 30-45 degrees.',
                    'Hold dumbbells at chest height with palms facing forward.',
                    'Press the weights up until arms are fully extended, maintaining a slight bend in elbows.',
                    'Lower dumbbells slowly back to chest level.'
                ],
                'tips' => 'Focus on squeezing upper pectorals at the peak.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'chest_incline_dumbbell',
                'video' => 'chest_incline_dumbbell_vid',
                'related' => [2, 3],
                'youtube_video_id' => '8iPjhi7qJ8s'
            ],
            [
                'id' => 2,
                'name' => 'Barbell Bench Press',
                'category' => 'Chest',
                'target_muscles' => ['Middle Chest', 'Triceps'],
                'difficulty' => 'Intermediate',
                'calories' => 140,
                'duration' => 12,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Lie flat on a bench, gripping the barbell slightly wider than shoulder-width.',
                    'Unrack the bar and lower it slowly to mid-chest.',
                    'Drive the bar upwards dynamically by contracting your chest.'
                ],
                'tips' => 'Keep your feet firmly planted on the ground to secure drive.',
                'sets' => 4,
                'reps' => '6-8',
                'image' => 'chest_bench_press',
                'video' => 'chest_bench_press_vid',
                'related' => [1, 5],
                'youtube_video_id' => 'gRVjAtPip0Y'
            ],
            [
                'id' => 3,
                'name' => 'Cable Crossovers',
                'category' => 'Chest',
                'target_muscles' => ['Lower Chest', 'Inner Pectorals'],
                'difficulty' => 'Intermediate',
                'calories' => 90,
                'duration' => 8,
                'equipment' => 'Cables',
                'instructions' => [
                    'Set cable pulleys to high height.',
                    'Take one step forward, holding handles with slightly bent elbows.',
                    'Bring hands down and forward in a wide arc until they cross over.'
                ],
                'tips' => 'Contract pectorals intensely at crossover point.',
                'sets' => 3,
                'reps' => '12-15',
                'image' => 'chest_cables',
                'video' => 'chest_cables_vid',
                'related' => [1, 4],
                'youtube_video_id' => 'tCcySF5W1q0'
            ],
            [
                'id' => 4,
                'name' => 'Push-ups',
                'category' => 'Chest',
                'target_muscles' => ['Chest', 'Core', 'Triceps'],
                'difficulty' => 'Beginner',
                'calories' => 70,
                'duration' => 6,
                'equipment' => 'Bodyweight',
                'instructions' => [
                    'Assume plank position with hands slightly wider than shoulders.',
                    'Lower body until chest almost touches the floor.',
                    'Push back up to starting position.'
                ],
                'tips' => 'Keep core engaged and spine straight.',
                'sets' => 3,
                'reps' => '15-20',
                'image' => 'chest_pushup',
                'video' => 'chest_pushup_vid',
                'related' => [1, 2],
                'youtube_video_id' => 'IODxDxX7oi4'
            ],
            [
                'id' => 5,
                'name' => 'Chest Dips',
                'category' => 'Chest',
                'target_muscles' => ['Lower Chest', 'Triceps'],
                'difficulty' => 'Advanced',
                'calories' => 110,
                'duration' => 8,
                'equipment' => 'Parallel Bars',
                'instructions' => [
                    'Support body on parallel bars with locked elbows.',
                    'Lean torso slightly forward (approx. 15 degrees) and lower body by bending elbows.',
                    'Push back up until arms are fully locked.'
                ],
                'tips' => 'Keep elbows flared slightly outward to target lower chest.',
                'sets' => 3,
                'reps' => '8-12',
                'image' => 'chest_dips',
                'video' => 'chest_dips_vid',
                'related' => [2, 6],
                'youtube_video_id' => 'yN6Q1UI_xkE'
            ],

            // Back Exercises
            [
                'id' => 6,
                'name' => 'Lat Pulldown',
                'category' => 'Back',
                'target_muscles' => ['Lats', 'Biceps'],
                'difficulty' => 'Beginner',
                'calories' => 95,
                'duration' => 8,
                'equipment' => 'Cable Machine',
                'instructions' => [
                    'Sit at a pulldown station and secure knee pads.',
                    'Grasp the bar with a wide overhand grip.',
                    'Pull the bar down to upper chest while squeezing shoulder blades.'
                ],
                'tips' => 'Avoid pulling with biceps; drive through your elbows.',
                'sets' => 4,
                'reps' => '10-12',
                'image' => 'back_pulldown',
                'video' => 'back_pulldown_vid',
                'related' => [7, 9],
                'youtube_video_id' => 'CAwf7n6Luuc'
            ],
            [
                'id' => 7,
                'name' => 'Barbell Rows',
                'category' => 'Back',
                'target_muscles' => ['Lats', 'Rhomboids', 'Rear Delts'],
                'difficulty' => 'Intermediate',
                'calories' => 130,
                'duration' => 10,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Hinge at hips with bent knees, gripping barbell overhand.',
                    'Pull bar up to lower ribs, keeping elbows close to body.',
                    'Lower bar slowly to starting position.'
                ],
                'tips' => 'Maintain a flat, neutral spine throughout the set.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'back_rows',
                'video' => 'back_rows_vid',
                'related' => [6, 8],
                'youtube_video_id' => 'RQU8wLiHYBg'
            ],
            [
                'id' => 8,
                'name' => 'Deadlifts',
                'category' => 'Back',
                'target_muscles' => ['Lower Back', 'Hamstrings', 'Glutes'],
                'difficulty' => 'Advanced',
                'calories' => 180,
                'duration' => 15,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Stand with feet hip-width apart, barbell over mid-foot.',
                    'Bend at hips and knees, gripping bar overhand.',
                    'Drive legs into floor, pull chest up, and stand tall to lockout.'
                ],
                'tips' => 'Ensure bar path stays completely vertical close to shins.',
                'sets' => 4,
                'reps' => '5',
                'image' => 'back_deadlift',
                'video' => 'back_deadlift_vid',
                'related' => [7, 13],
                'youtube_video_id' => 'op9kVnSso6Q'
            ],
            [
                'id' => 9,
                'name' => 'Pull-ups',
                'category' => 'Back',
                'target_muscles' => ['Lats', 'Upper Back'],
                'difficulty' => 'Advanced',
                'calories' => 120,
                'duration' => 10,
                'equipment' => 'Pull-up Bar',
                'instructions' => [
                    'Hang from a bar with hands wider than shoulder-width, palms facing away.',
                    'Pull chest up to the bar by squeezing shoulder blades.',
                    'Lower slowly with control.'
                ],
                'tips' => 'Use full range of motion; avoid swinging torso.',
                'sets' => 3,
                'reps' => '8-10',
                'image' => 'back_pullup',
                'video' => 'back_pullup_vid',
                'related' => [6, 7],
                'youtube_video_id' => 'eGo4IYlbE5g'
            ],
            [
                'id' => 10,
                'name' => 'T-Bar Rows',
                'category' => 'Back',
                'target_muscles' => ['Middle Back', 'Biceps'],
                'difficulty' => 'Intermediate',
                'calories' => 115,
                'duration' => 10,
                'equipment' => 'T-Bar Station',
                'instructions' => [
                    'Position feet on platform, bend knees, and grip bar handles.',
                    'Pull handles up to midsection by driving elbows back.',
                    'Lower slowly under tension.'
                ],
                'tips' => 'Do not use momentum to pull the weight.',
                'sets' => 4,
                'reps' => '8-12',
                'image' => 'back_tbar',
                'video' => 'back_tbar_vid',
                'related' => [7, 11],
                'youtube_video_id' => 'yEoBaC9a5IQ'
            ],
            [
                'id' => 11,
                'name' => 'Seated Cable Rows',
                'category' => 'Back',
                'target_muscles' => ['Rhomboids', 'Lats'],
                'difficulty' => 'Beginner',
                'calories' => 90,
                'duration' => 8,
                'equipment' => 'Cable Machine',
                'instructions' => [
                    'Sit with knees slightly bent, grasping attachment handle.',
                    'Pull handle toward abdomen while pulling shoulder blades back.',
                    'Extend arms slowly back.'
                ],
                'tips' => 'Sit upright; do not lean backward.',
                'sets' => 3,
                'reps' => '10-12',
                'image' => 'back_seated_row',
                'video' => 'back_seated_row_vid',
                'related' => [6, 10],
                'youtube_video_id' => 'GZbfZ033fEs'
            ],

            // Legs Exercises
            [
                'id' => 12,
                'name' => 'Barbell Squats',
                'category' => 'Legs',
                'target_muscles' => ['Quads', 'Glutes', 'Hamstrings'],
                'difficulty' => 'Intermediate',
                'calories' => 150,
                'duration' => 12,
                'equipment' => 'Barbell & Rack',
                'instructions' => [
                    'Rest bar on upper traps, feet shoulder-width apart.',
                    'Descend by bending knees and sitting back on hips.',
                    'Push back up dynamically from heels.'
                ],
                'tips' => 'Keep chest upright and knees tracking over toes.',
                'sets' => 4,
                'reps' => '6-8',
                'image' => 'legs_squat',
                'video' => 'legs_squat_vid',
                'related' => [13, 14],
                'youtube_video_id' => 'ultW1OlMcO0'
            ],
            [
                'id' => 13,
                'name' => 'Leg Press',
                'category' => 'Legs',
                'target_muscles' => ['Quads', 'Hamstrings'],
                'difficulty' => 'Beginner',
                'calories' => 110,
                'duration' => 10,
                'equipment' => 'Leg Press Machine',
                'instructions' => [
                    'Sit with back flat against pad, feet shoulder-width on platform.',
                    'Lower platform slowly toward chest by bending knees.',
                    'Push platform away, extending legs without locking knees.'
                ],
                'tips' => 'Keep lower back pressed firmly into seat.',
                'sets' => 4,
                'reps' => '10-12',
                'image' => 'legs_press',
                'video' => 'legs_press_vid',
                'related' => [12, 15],
                'youtube_video_id' => 'yZ818-VQD_8'
            ],
            [
                'id' => 14,
                'name' => 'Romanian Deadlifts',
                'category' => 'Legs',
                'target_muscles' => ['Hamstrings', 'Glutes'],
                'difficulty' => 'Intermediate',
                'calories' => 120,
                'duration' => 10,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Stand holding barbell at hips, feet hip-width apart.',
                    'Hinge at hips, sliding bar down legs until stretch is felt.',
                    'Contract glutes and hamstrings to stand upright.'
                ],
                'tips' => 'Focus on pushing hips backward to load hamstrings.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'legs_rdl',
                'video' => 'legs_rdl_vid',
                'related' => [8, 12],
                'youtube_video_id' => 'jcV78V6_L9U'
            ],
            [
                'id' => 15,
                'name' => 'Dumbbell Lunges',
                'category' => 'Legs',
                'target_muscles' => ['Quads', 'Glutes'],
                'difficulty' => 'Beginner',
                'calories' => 95,
                'duration' => 8,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Stand holding dumbbells at sides.',
                    'Step forward with one leg, lowering hips until front thigh is parallel to floor.',
                    'Push off front foot to return to start.'
                ],
                'tips' => 'Keep front knee behind toes to protect joints.',
                'sets' => 3,
                'reps' => '10-12 per leg',
                'image' => 'legs_lunges',
                'video' => 'legs_lunges_vid',
                'related' => [12, 13],
                'youtube_video_id' => 'D7KaRcUTQeY'
            ],
            [
                'id' => 16,
                'name' => 'Leg Extensions',
                'category' => 'Legs',
                'target_muscles' => ['Quads'],
                'difficulty' => 'Beginner',
                'calories' => 75,
                'duration' => 6,
                'equipment' => 'Extension Machine',
                'instructions' => [
                    'Sit flat, securing pad against front of lower shins.',
                    'Extend legs upward until fully straight.',
                    'Lower back slowly.'
                ],
                'tips' => 'Squeeze quads at top of movement.',
                'sets' => 3,
                'reps' => '12-15',
                'image' => 'legs_extension',
                'video' => 'legs_extension_vid',
                'related' => [13, 17],
                'youtube_video_id' => 'm0FOpIK08Yg'
            ],
            [
                'id' => 17,
                'name' => 'Seated Hamstring Curls',
                'category' => 'Legs',
                'target_muscles' => ['Hamstrings'],
                'difficulty' => 'Beginner',
                'calories' => 75,
                'duration' => 6,
                'equipment' => 'Curl Machine',
                'instructions' => [
                    'Sit with lower legs on top of padded lever.',
                    'Pull lever down and backward toward back of thighs.',
                    'Return slowly to starting position.'
                ],
                'tips' => 'Squeeze hamstrings at point of peak contraction.',
                'sets' => 3,
                'reps' => '12-15',
                'image' => 'legs_curls',
                'video' => 'legs_curls_vid',
                'related' => [14, 16],
                'youtube_video_id' => 'OrXJK5yd1AM'
            ],
            [
                'id' => 18,
                'name' => 'Standing Calf Raises',
                'category' => 'Legs',
                'target_muscles' => ['Calves'],
                'difficulty' => 'Beginner',
                'calories' => 60,
                'duration' => 5,
                'equipment' => 'Calf Block / Smith',
                'instructions' => [
                    'Stand on edge of block with heels hanging off.',
                    'Rise up onto balls of feet as high as possible.',
                    'Lower heels below block level.'
                ],
                'tips' => 'Pause at bottom for full stretch.',
                'sets' => 4,
                'reps' => '15-20',
                'image' => 'legs_calves',
                'video' => 'legs_calves_vid',
                'related' => [12, 13],
                'youtube_video_id' => '3UWi44yN-w8'
            ],

            // Arms Exercises
            [
                'id' => 19,
                'name' => 'Dumbbell Bicep Curls',
                'category' => 'Arms',
                'target_muscles' => ['Biceps'],
                'difficulty' => 'Beginner',
                'calories' => 80,
                'duration' => 6,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Stand holding dumbbells at sides, palms facing forward.',
                    'Curl weights up toward shoulders, flexing biceps.',
                    'Lower slowly with control.'
                ],
                'tips' => 'Keep elbows locked at sides; do not swing.',
                'sets' => 3,
                'reps' => '10-12',
                'image' => 'arms_bicep_curl',
                'video' => 'arms_bicep_curl_vid',
                'related' => [20, 21],
                'youtube_video_id' => 'sAq_oX4c028'
            ],
            [
                'id' => 20,
                'name' => 'Hammer Curls',
                'category' => 'Arms',
                'target_muscles' => ['Brachialis', 'Biceps'],
                'difficulty' => 'Beginner',
                'calories' => 80,
                'duration' => 6,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Stand holding dumbbells with neutral grip (palms facing each other).',
                    'Curl weights up while maintaining neutral grip.'
                ],
                'tips' => 'Targets thickness of outer bicep and forearm.',
                'sets' => 3,
                'reps' => '10-12',
                'image' => 'arms_hammer_curl',
                'video' => 'arms_hammer_curl_vid',
                'related' => [19, 21],
                'youtube_video_id' => '7jqi2qWAUzQ'
            ],
            [
                'id' => 21,
                'name' => 'Preacher Curls',
                'category' => 'Arms',
                'target_muscles' => ['Biceps Peak'],
                'difficulty' => 'Intermediate',
                'calories' => 85,
                'duration' => 8,
                'equipment' => 'EZ Bar & Bench',
                'instructions' => [
                    'Sit at preacher bench, resting arms on padded support.',
                    'Grasp EZ bar, lower until arms are straight, and curl upwards.'
                ],
                'tips' => 'Isolates bicep completely; do not lock elbows at bottom.',
                'sets' => 3,
                'reps' => '8-12',
                'image' => 'arms_preacher',
                'video' => 'arms_preacher_vid',
                'related' => [19, 20],
                'youtube_video_id' => 'fIWP-FRFNU0'
            ],
            [
                'id' => 22,
                'name' => 'Cable Tricep Pushdowns',
                'category' => 'Arms',
                'target_muscles' => ['Triceps Lateral Head'],
                'difficulty' => 'Beginner',
                'calories' => 75,
                'duration' => 6,
                'equipment' => 'Cable Machine',
                'instructions' => [
                    'Stand facing pulley, gripping rope attachment.',
                    'Push rope down until arms are fully straight, splitting rope at bottom.'
                ],
                'tips' => 'Squeeze triceps at bottom extension.',
                'sets' => 4,
                'reps' => '12-15',
                'image' => 'arms_tricep_pushdown',
                'video' => 'arms_tricep_pushdown_vid',
                'related' => [23, 24],
                'youtube_video_id' => '2-LAMgAqyWY'
            ],
            [
                'id' => 23,
                'name' => 'Skull Crushers',
                'category' => 'Arms',
                'target_muscles' => ['Triceps Long Head'],
                'difficulty' => 'Intermediate',
                'calories' => 90,
                'duration' => 8,
                'equipment' => 'EZ Bar',
                'instructions' => [
                    'Lie flat on bench, holding EZ bar straight up.',
                    'Lower bar slowly by bending elbows until bar reaches forehead.',
                    'Extend arms to push back up.'
                ],
                'tips' => 'Keep elbows pointed straight up throughout movement.',
                'sets' => 4,
                'reps' => '10-12',
                'image' => 'arms_skull_crusher',
                'video' => 'arms_skull_crusher_vid',
                'related' => [22, 24],
                'youtube_video_id' => 'd_KZxkY_0cM'
            ],
            [
                'id' => 24,
                'name' => 'Overhead Tricep Extensions',
                'category' => 'Arms',
                'target_muscles' => ['Triceps'],
                'difficulty' => 'Beginner',
                'calories' => 80,
                'duration' => 6,
                'equipment' => 'Dumbbell',
                'instructions' => [
                    'Sit holding dumbbell overhead with both hands.',
                    'Lower dumbbell slowly behind head by bending elbows.',
                    'Extend arms to starting position.'
                ],
                'tips' => 'Keep upper arms close to ears.',
                'sets' => 3,
                'reps' => '10-12',
                'image' => 'arms_overhead_tricep',
                'video' => 'arms_overhead_tricep_vid',
                'related' => [22, 23],
                'youtube_video_id' => 'X-iV-DX2yEU'
            ],

            // Shoulders Exercises
            [
                'id' => 25,
                'name' => 'Seated Dumbbell Shoulder Press',
                'category' => 'Shoulders',
                'target_muscles' => ['Front Delts', 'Triceps'],
                'difficulty' => 'Intermediate',
                'calories' => 110,
                'duration' => 8,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Sit on bench, holding dumbbells at shoulder height.',
                    'Press weights overhead until arms are straight.',
                    'Lower slowly back to starting level.'
                ],
                'tips' => 'Avoid arching lower back excessively.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'shoulders_db_press',
                'video' => 'shoulders_db_press_vid',
                'related' => [26, 27],
                'youtube_video_id' => 'HzIiNhse09I'
            ],
            [
                'id' => 26,
                'name' => 'Dumbbell Lateral Raises',
                'category' => 'Shoulders',
                'target_muscles' => ['Side Delts'],
                'difficulty' => 'Beginner',
                'calories' => 75,
                'duration' => 6,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Stand holding dumbbells at sides.',
                    'Raise arms outward in wide arc to shoulder level.',
                    'Lower slowly with control.'
                ],
                'tips' => 'Lead with elbows and pour imaginary water at top.',
                'sets' => 4,
                'reps' => '12-15',
                'image' => 'shoulders_lateral_raise',
                'video' => 'shoulders_lateral_raise_vid',
                'related' => [25, 29],
                'youtube_video_id' => '3VcKaXtougg'
            ],
            [
                'id' => 27,
                'name' => 'Barbell Overhead Press',
                'category' => 'Shoulders',
                'target_muscles' => ['Shoulders', 'Core'],
                'difficulty' => 'Advanced',
                'calories' => 130,
                'duration' => 10,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Stand with barbell at collarbone height, grip shoulder-width.',
                    'Brace core, squeeze glutes, and press bar overhead in straight path.'
                ],
                'tips' => 'Pull head back as bar passes face, push head forward at lockout.',
                'sets' => 4,
                'reps' => '6-8',
                'image' => 'shoulders_barbell_press',
                'video' => 'shoulders_barbell_press_vid',
                'related' => [25, 28],
                'youtube_video_id' => 'HzIiNhse09I'
            ],
            [
                'id' => 28,
                'name' => 'Face Pulls',
                'category' => 'Shoulders',
                'target_muscles' => ['Rear Delts', 'Rotator Cuff'],
                'difficulty' => 'Beginner',
                'calories' => 80,
                'duration' => 6,
                'equipment' => 'Cable Machine',
                'instructions' => [
                    'Attach rope to high pulley and hold with overhand grip.',
                    'Pull rope toward face, flaring elbows and rotating shoulders.',
                    'Squeeze rear delts.'
                ],
                'tips' => 'Focus on pulling rope apart at top of motion.',
                'sets' => 3,
                'reps' => '12-15',
                'image' => 'shoulders_face_pulls',
                'video' => 'shoulders_face_pulls_vid',
                'related' => [26, 27],
                'youtube_video_id' => 'V8dZ33a8m_8'
            ],
            [
                'id' => 29,
                'name' => 'Front Dumbbell Raises',
                'category' => 'Shoulders',
                'target_muscles' => ['Front Delts'],
                'difficulty' => 'Beginner',
                'calories' => 75,
                'duration' => 6,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Stand holding dumbbells in front of thighs.',
                    'Raise weights forward to shoulder height.',
                    'Lower slowly.'
                ],
                'tips' => 'Keep torso still; do not rock.',
                'sets' => 3,
                'reps' => '10-12',
                'image' => 'shoulders_front_raise',
                'video' => 'shoulders_front_raise_vid',
                'related' => [25, 26],
                'youtube_video_id' => 'AL72F7Yx0zU'
            ],

            // Core Exercises
            [
                'id' => 30,
                'name' => 'Hanging Leg Raises',
                'category' => 'Core',
                'target_muscles' => ['Lower Abs', 'Hip Flexors'],
                'difficulty' => 'Advanced',
                'calories' => 95,
                'duration' => 8,
                'equipment' => 'Pull-up Bar',
                'instructions' => [
                    'Hang from bar with straight arms.',
                    'Raise legs slowly until they are parallel to floor.',
                    'Lower slowly under control.'
                ],
                'tips' => 'Avoid swinging torso to raise legs.',
                'sets' => 3,
                'reps' => '8-12',
                'image' => 'core_hanging_raise',
                'video' => 'core_hanging_raise_vid',
                'related' => [31, 32],
                'youtube_video_id' => 'hdnHCSSZ-R0'
            ],
            [
                'id' => 31,
                'name' => 'Abdominal Crunches',
                'category' => 'Core',
                'target_muscles' => ['Upper Abs'],
                'difficulty' => 'Beginner',
                'calories' => 60,
                'duration' => 5,
                'equipment' => 'Bodyweight',
                'instructions' => [
                    'Lie on back with knees bent, hands behind head.',
                    'Lift shoulder blades off floor, contracting abdominals.',
                    'Lower back slowly.'
                ],
                'tips' => 'Do not pull neck up with hands.',
                'sets' => 3,
                'reps' => '15-20',
                'image' => 'core_crunches',
                'video' => 'core_crunches_vid',
                'related' => [30, 32],
                'youtube_video_id' => 'MKmrqcoCz-M'
            ],
            [
                'id' => 32,
                'name' => 'Planks',
                'category' => 'Core',
                'target_muscles' => ['Transverse Abdominis', 'Obliques'],
                'difficulty' => 'Beginner',
                'calories' => 70,
                'duration' => 6,
                'equipment' => 'Bodyweight',
                'instructions' => [
                    'Assume forearm plank, elbows directly under shoulders.',
                    'Maintain a straight line from head to heels.',
                    'Hold position.'
                ],
                'tips' => 'Keep glutes squeezed and hips elevated.',
                'sets' => 3,
                'reps' => '60s hold',
                'image' => 'core_plank',
                'video' => 'core_plank_vid',
                'related' => [30, 31],
                'youtube_video_id' => 'ASzZgN6Q1g4'
            ],
            [
                'id' => 33,
                'name' => 'Russian Twists',
                'category' => 'Core',
                'target_muscles' => ['Obliques'],
                'difficulty' => 'Beginner',
                'calories' => 80,
                'duration' => 6,
                'equipment' => 'Medicine Ball / DB',
                'instructions' => [
                    'Sit with knees bent, feet slightly off floor.',
                    'Hold weight at chest and rotate torso slowly to left, then to right.'
                ],
                'tips' => 'Follow movement of weight with your gaze.',
                'sets' => 3,
                'reps' => '12 per side',
                'image' => 'core_twists',
                'video' => 'core_twists_vid',
                'related' => [31, 32],
                'youtube_video_id' => 'wkD8rjkS_R8'
            ],
            [
                'id' => 34,
                'name' => 'Cable Woodchoppers',
                'category' => 'Core',
                'target_muscles' => ['Obliques', 'Core Rotators'],
                'difficulty' => 'Intermediate',
                'calories' => 90,
                'duration' => 8,
                'equipment' => 'Cable Machine',
                'instructions' => [
                    'Set cable pulley high, grip handle with both hands.',
                    'Pull handle diagonally down across body, rotating torso.',
                    'Return slowly.'
                ],
                'tips' => 'Pivot on back foot during rotation.',
                'sets' => 3,
                'reps' => '10-12 per side',
                'image' => 'core_woodchopper',
                'video' => 'core_woodchopper_vid',
                'related' => [30, 33],
                'youtube_video_id' => 'p9eC6Vw6uF4'
            ],

            // Cardio Exercises
            [
                'id' => 35,
                'name' => 'Treadmill Interval Run',
                'category' => 'Cardio',
                'target_muscles' => ['Cardiovascular System', 'Legs'],
                'difficulty' => 'Intermediate',
                'calories' => 200,
                'duration' => 20,
                'equipment' => 'Treadmill',
                'instructions' => [
                    'Warm up for 3 minutes.',
                    'Sprint at high intensity for 60 seconds.',
                    'Recover at jog speed for 60 seconds.',
                    'Repeat intervals.'
                ],
                'tips' => 'Maintain dynamic arm pump during sprint.',
                'sets' => 10,
                'reps' => 'Intervals',
                'image' => 'cardio_treadmill',
                'video' => 'cardio_treadmill_vid',
                'related' => [36, 37],
                'youtube_video_id' => '4n9fR3Jj9yA'
            ],
            [
                'id' => 36,
                'name' => 'Stationary Cycling',
                'category' => 'Cardio',
                'target_muscles' => ['Quads', 'Cardiovascular'],
                'difficulty' => 'Beginner',
                'calories' => 150,
                'duration' => 15,
                'equipment' => 'Spin Bike',
                'instructions' => [
                    'Set saddle to hip height.',
                    'Pedal at steady tempo matching target heart rate.'
                ],
                'tips' => 'Keep upper body stable; drive power from legs.',
                'sets' => 1,
                'reps' => '15 mins',
                'image' => 'cardio_cycling',
                'video' => 'cardio_cycling_vid',
                'related' => [35, 37],
                'youtube_video_id' => '4yKry8tWkO8'
            ],
            [
                'id' => 37,
                'name' => 'Rowing Machine Sprint',
                'category' => 'Cardio',
                'target_muscles' => ['Full Body', 'Cardio'],
                'difficulty' => 'Intermediate',
                'calories' => 180,
                'duration' => 12,
                'equipment' => 'Rowing Machine',
                'instructions' => [
                    'Secure feet, grip handles with straight arms.',
                    'Drive back with legs, lean slightly back, pull handles to chest.',
                    'Return arm, hinge hip, slide seat.'
                ],
                'tips' => 'Power originates 60% from legs, 20% core, 20% arms.',
                'sets' => 4,
                'reps' => '500m sprint',
                'image' => 'cardio_rowing',
                'video' => 'cardio_rowing_vid',
                'related' => [35, 36],
                'youtube_video_id' => 'zQ-82NAtS3c'
            ],
            [
                'id' => 38,
                'name' => 'Jump Rope Crossover',
                'category' => 'Cardio',
                'target_muscles' => ['Calves', 'Cardiovascular'],
                'difficulty' => 'Intermediate',
                'calories' => 140,
                'duration' => 10,
                'equipment' => 'Jump Rope',
                'instructions' => [
                    'Hold rope handles, stand tall.',
                    'Swing rope, jump on balls of feet.',
                    'Incorporate crossover arm motions.'
                ],
                'tips' => 'Jump close to floor; keep elbows tucked.',
                'sets' => 5,
                'reps' => '2 mins',
                'image' => 'cardio_jumprope',
                'video' => 'cardio_jumprope_vid',
                'related' => [35, 39],
                'youtube_video_id' => '4kL_A4O-fE0'
            ],

            // HIIT Exercises
            [
                'id' => 39,
                'name' => 'Burpees Overload',
                'category' => 'HIIT',
                'target_muscles' => ['Full Body', 'Cardio'],
                'difficulty' => 'Advanced',
                'calories' => 160,
                'duration' => 10,
                'equipment' => 'Bodyweight',
                'instructions' => [
                    'Drop into squat position, place hands on floor.',
                    'Jump feet back into plank, perform a push-up.',
                    'Jump feet forward, explode upwards with hands high.'
                ],
                'tips' => 'Pace yourself; execute with consistent form.',
                'sets' => 4,
                'reps' => '45s active',
                'image' => 'hiit_burpees',
                'video' => 'hiit_burpees_vid',
                'related' => [35, 41],
                'youtube_video_id' => 'qLBImHhCXdA'
            ],
            [
                'id' => 40,
                'name' => 'Kettlebell Swings',
                'category' => 'HIIT',
                'target_muscles' => ['Glutes', 'Hamstrings', 'Shoulders'],
                'difficulty' => 'Intermediate',
                'calories' => 130,
                'duration' => 8,
                'equipment' => 'Kettlebell',
                'instructions' => [
                    'Hinge at hips holding kettlebell in front.',
                    'Swing bell backward through legs, drive hips forward explosively.',
                    'Let bell float to chest height.'
                ],
                'tips' => 'Power comes entirely from hip hinge, not arm lift.',
                'sets' => 4,
                'reps' => '20 swings',
                'image' => 'hiit_kettlebell',
                'video' => 'hiit_kettlebell_vid',
                'related' => [8, 39],
                'youtube_video_id' => 'sSESeWD6t2E'
            ],
            [
                'id' => 41,
                'name' => 'Battle Ropes Wave',
                'category' => 'HIIT',
                'target_muscles' => ['Shoulders', 'Core', 'Cardio'],
                'difficulty' => 'Beginner',
                'calories' => 120,
                'duration' => 8,
                'equipment' => 'Battle Ropes',
                'instructions' => [
                    'Assume half-squat stance, hold rope handles.',
                    'Whip ropes up and down quickly, creating fluid waves.'
                ],
                'tips' => 'Keep core tight; utilize shoulder flexion.',
                'sets' => 4,
                'reps' => '30s active',
                'image' => 'hiit_battleropes',
                'video' => 'hiit_battleropes_vid',
                'related' => [39, 42],
                'youtube_video_id' => 'z1_qN02WshE'
            ],
            [
                'id' => 42,
                'name' => 'Box Jumps',
                'category' => 'HIIT',
                'target_muscles' => ['Quads', 'Glutes', 'Explosive Power'],
                'difficulty' => 'Intermediate',
                'calories' => 110,
                'duration' => 8,
                'equipment' => 'Plyo Box',
                'instructions' => [
                    'Stand facing box, bend knees.',
                    'Explode upward, landing softly in squat on box.',
                    'Step down.'
                ],
                'tips' => 'Land with soft joints; do not jump off backward.',
                'sets' => 4,
                'reps' => '10 jumps',
                'image' => 'hiit_boxjumps',
                'video' => 'hiit_boxjumps_vid',
                'related' => [12, 39],
                'youtube_video_id' => '52r_Ul5k04k'
            ],
            [
                'id' => 43,
                'name' => 'Mountain Climbers',
                'category' => 'HIIT',
                'target_muscles' => ['Core', 'Shoulders', 'Cardio'],
                'difficulty' => 'Beginner',
                'calories' => 90,
                'duration' => 6,
                'equipment' => 'Bodyweight',
                'instructions' => [
                    'Assume high plank position.',
                    'Drive one knee rapidly to chest, return, drive opposite knee.'
                ],
                'tips' => 'Pace rapidly; keep hips level.',
                'sets' => 3,
                'reps' => '45s active',
                'image' => 'hiit_mountain_climber',
                'video' => 'hiit_mountain_climber_vid',
                'related' => [32, 39],
                'youtube_video_id' => 'qLBImHhCXdA' // Fallback to burpee wave/HIIT
            ],

            // Yoga Exercises
            [
                'id' => 44,
                'name' => 'Downward Facing Dog',
                'category' => 'Yoga',
                'target_muscles' => ['Shoulders', 'Hamstrings', 'Calves'],
                'difficulty' => 'Beginner',
                'calories' => 50,
                'duration' => 5,
                'equipment' => 'Yoga Mat',
                'instructions' => [
                    'Assume all-fours stance.',
                    'Tuck toes, lift knees, push hips high into inverted V shape.',
                    'Press heels into mat.'
                ],
                'tips' => 'Spread fingers wide; push torso away from hands.',
                'sets' => 3,
                'reps' => '45s hold',
                'image' => 'yoga_down_dog',
                'video' => 'yoga_down_dog_vid',
                'related' => [45, 46],
                'youtube_video_id' => 'EC7RGJ975iM'
            ],
            [
                'id' => 45,
                'name' => 'Warrior II Pose',
                'category' => 'Yoga',
                'target_muscles' => ['Quads', 'Groin', 'Shoulders'],
                'difficulty' => 'Beginner',
                'calories' => 60,
                'duration' => 6,
                'equipment' => 'Yoga Mat',
                'instructions' => [
                    'Step feet 4 feet apart, turn right foot 90 degrees.',
                    'Bend right knee until thigh parallel to mat.',
                    'Extend arms horizontally.'
                ],
                'tips' => 'Gaze over front right fingers.',
                'sets' => 3,
                'reps' => '30s hold per side',
                'image' => 'yoga_warrior',
                'video' => 'yoga_warrior_vid',
                'related' => [44, 47],
                'youtube_video_id' => '4ykOyC-U3B4'
            ],
            [
                'id' => 46,
                'name' => 'Cobra Pose',
                'category' => 'Yoga',
                'target_muscles' => ['Spine', 'Chest', 'Shoulders'],
                'difficulty' => 'Beginner',
                'calories' => 40,
                'duration' => 4,
                'equipment' => 'Yoga Mat',
                'instructions' => [
                    'Lie face down, hands under shoulders.',
                    'Hug elbows close to ribs, press tops of feet into floor.',
                    'Inhale, lift chest off mat by straightening arms partially.'
                ],
                'tips' => 'Avoid compressing lower spine; keep shoulders down.',
                'sets' => 3,
                'reps' => '30s hold',
                'image' => 'yoga_cobra',
                'video' => 'yoga_cobra_vid',
                'related' => [44, 45],
                'youtube_video_id' => 'EC7RGJ975iM' // Fallback to Downward dog
            ],
            [
                'id' => 47,
                'name' => 'Tree Pose',
                'category' => 'Yoga',
                'target_muscles' => ['Ankles', 'Calves', 'Balance'],
                'difficulty' => 'Intermediate',
                'calories' => 40,
                'duration' => 5,
                'equipment' => 'Yoga Mat',
                'instructions' => [
                    'Stand tall, shift weight to left foot.',
                    'Place sole of right foot against inner left calf or thigh.',
                    'Bring hands to prayer position at heart.'
                ],
                'tips' => 'Do not place foot directly on knee joint.',
                'sets' => 3,
                'reps' => '30s hold per side',
                'image' => 'yoga_tree',
                'video' => 'yoga_tree_vid',
                'related' => [44, 45],
                'youtube_video_id' => '4ykOyC-U3B4' // Fallback to Warrior II
            ],

            // Full Body Exercises
            [
                'id' => 48,
                'name' => 'Thrusters Barbell',
                'category' => 'Full Body',
                'target_muscles' => ['Quads', 'Shoulders', 'Core'],
                'difficulty' => 'Advanced',
                'calories' => 160,
                'duration' => 10,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Clean barbell to front rack position.',
                    'Descend into full squat.',
                    'Drive up explosively, pressing bar overhead in one fluid motion.'
                ],
                'tips' => 'Coordinate leg drive and arm press seamlessly.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'fullbody_thrusters',
                'video' => 'fullbody_thrusters_vid',
                'related' => [12, 27],
                'youtube_video_id' => 'Kj6al81L8qY' // Fallback clean & press
            ],
            [
                'id' => 49,
                'name' => 'Clean and Press',
                'category' => 'Full Body',
                'target_muscles' => ['Hamstrings', 'Back', 'Shoulders'],
                'difficulty' => 'Advanced',
                'calories' => 170,
                'duration' => 12,
                'equipment' => 'Barbell',
                'instructions' => [
                    'Pull barbell off floor, cleaning it to front rack.',
                    'Perform push press overhead, locking elbows.'
                ],
                'tips' => 'Brace core tightly during pull and press phases.',
                'sets' => 4,
                'reps' => '5',
                'image' => 'fullbody_clean_press',
                'video' => 'fullbody_clean_press_vid',
                'related' => [8, 27],
                'youtube_video_id' => 'Kj6al81L8qY'
            ],
            [
                'id' => 50,
                'name' => 'Dumbbell Devil Press',
                'category' => 'Full Body',
                'target_muscles' => ['Chest', 'Shoulders', 'Cardio'],
                'difficulty' => 'Advanced',
                'calories' => 180,
                'duration' => 10,
                'equipment' => 'Dumbbells',
                'instructions' => [
                    'Perform burpee holding dumbbells.',
                    'Jump feet forward, swing dumbbells back between legs, and snatch them overhead.'
                ],
                'tips' => 'Uses absolute raw explosive force; maintain a braced spine.',
                'sets' => 4,
                'reps' => '8-10',
                'image' => 'fullbody_devil_press',
                'video' => 'fullbody_devil_press_vid',
                'related' => [39, 48],
                'youtube_video_id' => 'Kj6al81L8qY' // Fallback to Clean & Press
            ]
        ];

        $defaultCategoryYoutubeIds = [
            'Chest' => 'gRVjAtPip0Y',       // Bench Press
            'Back' => 'op9kVnSso6Q',        // Deadlift
            'Legs' => 'ultW1OlMcO0',        // Squat
            'Arms' => 'ykJgrb560_Y',        // Bicep curls
            'Shoulders' => 'HzIiNhse09I',   // Shoulder press
            'Core' => 'ASzZgN6Q1g4',        // Plank
            'Cardio' => 'qLBImHhCXdA',      // Burpee
            'HIIT' => 'qLBImHhCXdA',        // Burpee
            'Yoga' => 'EC7RGJ975iM',        // Downward dog
            'Full Body' => 'Kj6al81L8qY'    // Clean & Press
        ];

        $specificYoutubeIds = [
            'Barbell Squats' => 'ultW1OlMcO0',
            'Barbell Bench Press' => 'gRVjAtPip0Y',
            'Deadlifts' => 'op9kVnSso6Q',
            'Downward Facing Dog' => 'EC7RGJ975iM',
            'Warrior II Pose' => '4ykOyC-U3B4',
            'Burpees Overload' => 'qLBImHhCXdA',
            'Clean and Press' => 'Kj6al81L8qY',
            'Dumbbell Bicep Curls' => 'ykJgrb560_Y',
            'Planks' => 'ASzZgN6Q1g4',
            'Seated Dumbbell Shoulder Press' => 'HzIiNhse09I',
            'Barbell Overhead Press' => 'HzIiNhse09I',
            'Lat Pulldown' => 'CAwf7n6Luuc',
            'Push-ups' => 'IODxDxX7oi4'
        ];

        foreach ($exercises as $ex) {
            $name = $ex['name'];
            $category = $ex['category'];
            $specificId = $specificYoutubeIds[$name] ?? null;
            $categoryId = $defaultCategoryYoutubeIds[$category] ?? 'gRVjAtPip0Y';
            
            $ex['youtube_video_id'] = $specificId ?? $categoryId;
            
            LibraryExercise::create($ex);
        }
    }
}
