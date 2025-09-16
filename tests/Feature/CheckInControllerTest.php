<?php

namespace Tests\Feature;

use App\Models\CheckIn;
use App\Models\Fleet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckInControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $fleetUser;
    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create fleet user
        $this->fleetUser = User::factory()->create([
            'role' => 'armada',
        ]);

        // Create admin user
        $this->adminUser = User::factory()->create([
            'role' => 'admin',
        ]);
    }

    /** @test */
    public function fleet_user_can_create_check_in()
    {
        $fleet = Fleet::factory()->create();

        $checkInData = [
            'fleet_id' => $fleet->id,
            'latitude' => 12.34567890,
            'longitude' => 98.76543210,
        ];

        $response = $this->actingAs($this->fleetUser)
            ->post(route('check-ins.store'), $checkInData);

        $response->assertRedirect(route('check-ins.index'));
        $this->assertDatabaseHas('check_ins', $checkInData);
    }

    /** @test */
    public function admin_can_view_check_ins()
    {
        $checkIn = CheckIn::factory()
            ->for(Fleet::factory())
            ->create();

        $response = $this->actingAs($this->adminUser)
            ->get(route('check-ins.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('CheckIns/Index')
            ->has('checkIns', 1)
        );
    }

    /** @test */
    public function fleet_user_can_view_check_in_form()
    {
        $fleet = Fleet::factory()->create();

        $response = $this->actingAs($this->fleetUser)
            ->get(route('check-ins.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('CheckIns/Create')
            ->has('fleets')
        );
    }
}
