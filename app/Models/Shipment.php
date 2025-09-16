<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shipment_number',
        'shipment_date',
        'origin_location',
        'destination_location',
        'status',
        'fleet_id',
        'customer_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'shipment_date' => 'date',
    ];

    /**
     * Get the fleet that owns the shipment.
     */
    public function fleet()
    {
        return $this->belongsTo(Fleet::class);
    }

    /**
     * Get the customer that owns the shipment.
     */
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
