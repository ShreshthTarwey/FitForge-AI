<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LibraryExercise extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'library_exercises';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'category',
        'target_muscles',
        'difficulty',
        'calories',
        'duration',
        'equipment',
        'instructions',
        'tips',
        'sets',
        'reps',
        'image',
        'video',
        'related',
        'youtube_video_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'target_muscles' => 'array',
        'instructions' => 'array',
        'related' => 'array',
    ];
}
