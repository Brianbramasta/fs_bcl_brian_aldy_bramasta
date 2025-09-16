<?php

namespace Tests\Feature;

use App\Models\Fleet;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShipmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $customerUser;
    protected $adminUser;
    protected $fleetUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create customer user
        $this->customerUser = User::factory()->create([
            'role' => 'pelanggan',
        ]);

        // Create admin user
        $this->adminUser = User::factory()->create([
            'role' => 'admin',
        ]);

        // Create fleet user
        $this->fleetUser = User::factory()->create([
            'role' => 'armada',
        ]);
    }

    /** @test */
    public function customer_can_view_shipments()
    {
        $shipment = Shipment::factory()
            ->for($this->customerUser, 'customer')
            ->create();

        $response = $this->actingAs($this->customerUser)
            ->get(route('shipments.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Shipments/Index')
            ->has('shipments', 1)
        );
    }

    /** @test */
    public function customer_can_create_shipment()
    {
        $fleet = Fleet::factory()->create([
            'availability' => 'available',
        ]);

        $shipmentData = [
            'shipment_number' => 'SHIP-TEST',
            'shipment_date' => '2025-12-01',
            'origin_location' => 'Origin City',
            'destination_location' => 'Destination City',
            'fleet_id' => $fleet->id,
        ];

        $response = $this->actingAs($this->customerUser)
            ->post(route('shipments.store'), $shipmentData);

        $response->assertRedirect(route('shipments.index'));
        $this->assertDatabaseHas('shipments', $shipmentData);

        // Check that fleet availability was updated
        $this->assertDatabaseHas('fleets', [
            'id' => $fleet->id,
            'availability' => 'unavailable',
        ]);
    }

    /** @test */
    public function customer_can_track_shipment()
    {
        $shipment = Shipment::factory()
            ->for($this->customerUser, 'customer')
            ->create();

        $response = $this->get(route('shipments.track', [
            'shipment_number' => $shipment->shipment_number,
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Shipments/Track')
            ->where('shipment.shipment_number', $shipment->shipment_number)
        );
    }

    /** @test */
    public function admin_can_update_shipment()
    {
        $shipment = Shipment::factory()
            ->for($this->customerUser, 'customer')
            ->create();

        $fleet = Fleet::factory()->create();

        $updatedData = [
            'shipment_number' => 'SHIP-UPDATED',
            'shipment_date' => '2025-12-02',
            'origin_location' => 'Updated Origin',
            'destination_location' => 'Updated Destination',
            'fleet_id' => $fleet->id,
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('shipments.update', $shipment), $updatedData);

        $response->assertRedirect(route('shipments.index'));
        $this->assertDatabaseHas('shipments', $updatedData);
    }

    /** @test */
    public function admin_can_delete_shipment()
    {
        $fleet = Fleet::factory()->create([
            'availability' => 'unavailable',
        ]);

        $shipment = Shipment::factory()
            ->for($this->customerUser, 'customer')
            ->for($fleet, 'fleet')
            ->create();

        $response = $this->actingAs($this->adminUser)
            ->delete(route('shipments.destroy', $shipment));

        $response->assertRedirect(route('shipments.index'));
        $this->assertDatabaseMissing('shipments', $shipment->toArray());

        // Check that fleet availability was updated back to available
        $this->assertDatabaseHas('fleets', [
            'id' => $fleet->id,
            'availability' => 'available',
        ]);
    }
}
