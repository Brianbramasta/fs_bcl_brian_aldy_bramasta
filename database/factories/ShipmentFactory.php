<?php

namespace Database\Factories;

use App\Models\Fleet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shipment_number' => $this->faker->unique()->regexify('SHIP-[0-9]{4}'),
            'shipment_date' => $this->faker->date(),
            'origin_location' => $this->faker->city(),
            'destination_location' => $this->faker->city(),
            'status' => $this->faker->randomElement(['pending', 'in_transit', 'arrived']),
            'fleet_id' => Fleet::factory(),
            'customer_id' => User::factory(),
        ];
    }
}
