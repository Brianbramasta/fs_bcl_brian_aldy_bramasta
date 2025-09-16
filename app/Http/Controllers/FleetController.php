<?php

namespace App\Http\Controllers;

use App\Models\Fleet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FleetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fleet::query();

        // Search by fleet number or vehicle type
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('fleet_number', 'like', '%' . $request->search . '%')
                  ->orWhere('vehicle_type', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by availability
        if ($request->has('availability') && $request->availability) {
            $query->where('availability', $request->availability);
        }

        // Filter by vehicle type
        if ($request->has('vehicle_type') && $request->vehicle_type) {
            $query->where('vehicle_type', $request->vehicle_type);
        }

        $fleets = $query->get();

        // Get unique vehicle types for filter dropdown
        $vehicleTypes = Fleet::select('vehicle_type')->distinct()->pluck('vehicle_type');

        return Inertia::render('Fleets/Index', [
            'fleets' => $fleets,
            'filters' => $request->only(['search', 'availability', 'vehicle_type']),
            'vehicleTypes' => $vehicleTypes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Fleets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'fleet_number' => 'required|unique:fleets',
            'vehicle_type' => 'required',
            'capacity' => 'required|numeric|min:0',
        ]);

        Fleet::create($request->all());

        return redirect()->route('fleets.index')->with('success', 'Fleet created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Fleet $fleet)
    {
        return Inertia::render('Fleets/Show', [
            'fleet' => $fleet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fleet $fleet)
    {
        return Inertia::render('Fleets/Edit', [
            'fleet' => $fleet,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fleet $fleet)
    {
        $request->validate([
            'fleet_number' => 'required|unique:fleets,fleet_number,' . $fleet->id,
            'vehicle_type' => 'required',
            'capacity' => 'required|numeric|min:0',
        ]);

        $fleet->update($request->all());

        return redirect()->route('fleets.index')->with('success', 'Fleet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fleet $fleet)
    {
        $fleet->delete();

        return redirect()->route('fleets.index')->with('success', 'Fleet deleted successfully.');
    }
}
