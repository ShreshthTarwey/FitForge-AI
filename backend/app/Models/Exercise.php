<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $guarded = [];

    public function workoutPlan()
    {
        return $this->belongsTo(WorkoutPlan::class);
    }
}
