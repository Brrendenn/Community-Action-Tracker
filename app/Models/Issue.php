<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [ // <-- ADD THIS ARRAY
        'title',
        'location',
        'description',
        'photo_path',
        'status',
        'user_id'
    ];
    /**
     * Get the user that reported the issue.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}