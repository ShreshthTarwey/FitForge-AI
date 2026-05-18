<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'calories',
        'protein',
        'carbs',
        'fats',
        'meal_type',
        'time',
        'logged_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
