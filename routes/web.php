<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FleetController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Fleet routes
    Route::resource('fleets', FleetController::class);

    // Shipment routes
    Route::resource('shipments', ShipmentController::class);
    Route::get('/shipments/track', [ShipmentController::class, 'track'])->name('shipments.track');

    // Check-in routes
    Route::resource('check-ins', CheckInController::class);
    Route::get('/check-ins/latest', [CheckInController::class, 'latest'])->name('check-ins.latest');

    // Reports routes
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
