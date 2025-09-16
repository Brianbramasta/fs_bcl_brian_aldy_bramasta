<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fleet>
 */
class FleetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fleet_number' => $this->faker->unique()->regexify('FLEET-[0-9]{3}'),
            'vehicle_type' => $this->faker->randomElement(['Truck', 'Van', 'Motorcycle']),
            'availability' => $this->faker->randomElement(['available', 'unavailable']),
            'capacity' => $this->faker->randomFloat(2, 50, 2000),
        ];
    }
}
