<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckIn extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fleet_id',
        'latitude',
        'longitude',
        'check_in_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'check_in_time' => 'datetime',
    ];

    /**
     * Get the fleet that owns the check-in.
     */
    public function fleet()
    {
        return $this->belongsTo(Fleet::class);
    }
}
