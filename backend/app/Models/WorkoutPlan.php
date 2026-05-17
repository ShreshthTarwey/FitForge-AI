<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{
    protected $guarded = [];

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}
