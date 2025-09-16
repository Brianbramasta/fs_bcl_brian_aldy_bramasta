<?php

namespace Database\Factories;

use App\Models\Fleet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CheckIn>
 */
class CheckInFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fleet_id' => Fleet::factory(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'check_in_time' => $this->faker->dateTime(),
        ];
    }
}
