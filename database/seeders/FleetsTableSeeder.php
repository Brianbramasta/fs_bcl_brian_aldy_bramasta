<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Fleet;

class FleetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample fleet data
        Fleet::create([
            'fleet_number' => 'FLEET-001',
            'vehicle_type' => 'Truck',
            'availability' => 'available',
            'capacity' => 1000.00,
        ]);

        Fleet::create([
            'fleet_number' => 'FLEET-002',
            'vehicle_type' => 'Van',
            'availability' => 'available',
            'capacity' => 500.00,
        ]);

        Fleet::create([
            'fleet_number' => 'FLEET-003',
            'vehicle_type' => 'Motorcycle',
            'availability' => 'unavailable',
            'capacity' => 50.00,
        ]);
    }
}
