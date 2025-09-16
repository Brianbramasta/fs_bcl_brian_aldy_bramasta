<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fleet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fleet_number',
        'vehicle_type',
        'availability',
        'capacity',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'capacity' => 'decimal:2',
    ];

    /**
     * Get the shipments for the fleet.
     */
    public function shipments()
    {
        return $this->hasMany(Shipment::class);
    }

    /**
     * Get the check-ins for the fleet.
     */
    public function checkIns()
    {
        return $this->hasMany(CheckIn::class);
    }
}
