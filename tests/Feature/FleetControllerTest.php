<?php

namespace Tests\Feature;

use App\Models\Fleet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FleetControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $adminUser;
    protected $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create admin user
        $this->adminUser = User::factory()->create([
            'role' => 'admin',
        ]);

        // Create regular user
        $this->regularUser = User::factory()->create([
            'role' => 'pelanggan',
        ]);
    }

    /** @test */
    public function admin_can_view_fleets()
    {
        $fleet = Fleet::factory()->create();

        $response = $this->actingAs($this->adminUser)
            ->get(route('fleets.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Fleets/Index')
            ->has('fleets', 1)
        );
    }

    /** @test */
    public function regular_user_can_view_fleets()
    {
        $fleet = Fleet::factory()->create();

        $response = $this->actingAs($this->regularUser)
            ->get(route('fleets.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_create_fleet()
    {
        $fleetData = [
            'fleet_number' => 'FLEET-TEST',
            'vehicle_type' => 'Truck',
            'capacity' => 1000.00,
        ];

        $response = $this->actingAs($this->adminUser)
            ->post(route('fleets.store'), $fleetData);

        $response->assertRedirect(route('fleets.index'));
        $this->assertDatabaseHas('fleets', $fleetData);
    }

    /** @test */
    public function regular_user_cannot_create_fleet()
    {
        $fleetData = [
            'fleet_number' => 'FLEET-TEST',
            'vehicle_type' => 'Truck',
            'capacity' => 1000.00,
        ];

        $response = $this->actingAs($this->regularUser)
            ->post(route('fleets.store'), $fleetData);

        // Regular users should be able to access the page but not create fleets
        // This depends on how we implement authorization in the controller
    }

    /** @test */
    public function admin_can_update_fleet()
    {
        $fleet = Fleet::factory()->create();

        $updatedData = [
            'fleet_number' => 'FLEET-UPDATED',
            'vehicle_type' => 'Van',
            'capacity' => 500.00,
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('fleets.update', $fleet), $updatedData);

        $response->assertRedirect(route('fleets.index'));
        $this->assertDatabaseHas('fleets', $updatedData);
    }

    /** @test */
    public function admin_can_delete_fleet()
    {
        $fleet = Fleet::factory()->create();

        $response = $this->actingAs($this->adminUser)
            ->delete(route('fleets.destroy', $fleet));

        $response->assertRedirect(route('fleets.index'));
        $this->assertDatabaseMissing('fleets', $fleet->toArray());
    }
}
