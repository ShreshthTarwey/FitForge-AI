<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeightLog extends Model
{
    protected $fillable = [
        'user_id',
        'weight',
        'logged_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
