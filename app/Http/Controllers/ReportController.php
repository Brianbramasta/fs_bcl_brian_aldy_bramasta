<?php

namespace App\Http\Controllers;

use App\Models\Fleet;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class ReportController extends Controller
{
    /**
     * Display shipment reports.
     */
    public function index()
    {
        // Get shipment statistics per fleet using JOIN and GROUP BY as required
        $shipmentStats = DB::table('shipments')
            ->join('fleets', 'shipments.fleet_id', '=', 'fleets.id')
            ->select(
                'fleets.fleet_number',
                'fleets.vehicle_type',
                DB::raw('COUNT(shipments.id) as total_shipments'),
                DB::raw('SUM(CASE WHEN shipments.status = "in_transit" THEN 1 ELSE 0 END) as in_transit_count')
            )
            ->groupBy('fleets.id', 'fleets.fleet_number', 'fleets.vehicle_type')
            ->get();

        // Get fleet availability statistics
        $fleetStats = DB::table('fleets')
            ->select(
                'availability',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('availability')
            ->get();

        return Inertia::render('Reports/Index', [
            'shipmentStats' => $shipmentStats,
            'fleetStats' => $fleetStats,
        ]);
    }
}
