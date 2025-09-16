<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use App\Models\Fleet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Admin can view all check-ins
        $checkIns = CheckIn::with('fleet')->latest()->get();
        return Inertia::render('CheckIns/Index', [
            'checkIns' => $checkIns,
        ]);
    }

    /**
     * Show the form for creating a new check-in.
     */
    public function create()
    {
        // Fleet personnel can check in their location
        $fleet = Fleet::whereHas('checkIns', function ($query) {
            $query->where('fleet_id', auth()->user()->id);
        })->first();

        // If fleet user doesn't have a fleet assigned, get all fleets
        if (!$fleet) {
            $fleets = Fleet::all();
            return Inertia::render('CheckIns/Create', [
                'fleets' => $fleets,
            ]);
        }

        return Inertia::render('CheckIns/Create', [
            'fleet' => $fleet,
        ]);
    }

    /**
     * Store a newly created check-in in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'fleet_id' => 'required|exists:fleets,id',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        CheckIn::create([
            'fleet_id' => $request->fleet_id,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'check_in_time' => now(),
        ]);

        return redirect()->route('check-ins.index')->with('success', 'Location checked in successfully.');
    }

    /**
     * Display the specified check-in.
     */
    public function show(CheckIn $checkIn)
    {
        $checkIn->load('fleet');
        return Inertia::render('CheckIns/Show', [
            'checkIn' => $checkIn,
        ]);
    }

    /**
     * Get latest check-ins for admin map view.
     */
    public function latest()
    {
        $latestCheckIns = CheckIn::with('fleet')
            ->latest()
            ->limit(50)
            ->get();

        return response()->json($latestCheckIns);
    }
}
