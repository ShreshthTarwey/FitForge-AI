<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function workoutPlan()
    {
        return $this->belongsTo(WorkoutPlan::class);
    }
}
