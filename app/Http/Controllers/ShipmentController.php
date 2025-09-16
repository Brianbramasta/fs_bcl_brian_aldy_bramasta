<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\Fleet;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Shipment::with(['fleet', 'customer']);

        // Search by shipment number or destination
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('shipment_number', 'like', '%' . $request->search . '%')
                  ->orWhere('destination_location', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by fleet
        if ($request->has('fleet_id') && $request->fleet_id) {
            $query->where('fleet_id', $request->fleet_id);
        }

        $shipments = $query->get();

        // Get all fleets for filter dropdown
        $fleets = Fleet::all();

        return Inertia::render('Shipments/Index', [
            'shipments' => $shipments,
            'fleets' => $fleets,
            'filters' => $request->only(['search', 'status', 'fleet_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $fleets = Fleet::where('availability', 'available')->get();
        return Inertia::render('Shipments/Create', [
            'fleets' => $fleets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shipment_number' => 'required|unique:shipments',
            'shipment_date' => 'required|date|after:today',
            'origin_location' => 'required',
            'destination_location' => 'required',
            'fleet_id' => 'required|exists:fleets,id',
        ]);

        // Create shipment
        $shipment = Shipment::create([
            'shipment_number' => $request->shipment_number,
            'shipment_date' => $request->shipment_date,
            'origin_location' => $request->origin_location,
            'destination_location' => $request->destination_location,
            'fleet_id' => $request->fleet_id,
            'customer_id' => auth()->id(),
            'status' => 'pending',
        ]);

        // Update fleet availability
        $fleet = Fleet::find($request->fleet_id);
        $fleet->update(['availability' => 'unavailable']);

        return redirect()->route('shipments.index')->with('success', 'Shipment created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipment $shipment)
    {
        $shipment->load(['fleet', 'customer']);
        return Inertia::render('Shipments/Show', [
            'shipment' => $shipment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $shipment)
    {
        $fleets = Fleet::all();
        return Inertia::render('Shipments/Edit', [
            'shipment' => $shipment,
            'fleets' => $fleets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shipment $shipment)
    {
        $request->validate([
            'shipment_number' => 'required|unique:shipments,shipment_number,' . $shipment->id,
            'shipment_date' => 'required|date',
            'origin_location' => 'required',
            'destination_location' => 'required',
            'fleet_id' => 'required|exists:fleets,id',
        ]);

        $shipment->update($request->all());

        return redirect()->route('shipments.index')->with('success', 'Shipment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipment $shipment)
    {
        // Update fleet availability when shipment is deleted
        $fleet = $shipment->fleet;
        $fleet->update(['availability' => 'available']);

        $shipment->delete();

        return redirect()->route('shipments.index')->with('success', 'Shipment deleted successfully.');
    }

    /**
     * Track a shipment by number.
     */
    public function track(Request $request)
    {
        $shipment = null;
        $error = null;

        if ($request->has('shipment_number')) {
            $shipment = Shipment::with(['fleet', 'customer'])
                ->where('shipment_number', $request->shipment_number)
                ->first();

            if (!$shipment) {
                $error = 'Shipment not found.';
            }
        }

        return Inertia::render('Shipments/Track', [
            'shipment' => $shipment,
            'error' => $error,
        ]);
    }
}
