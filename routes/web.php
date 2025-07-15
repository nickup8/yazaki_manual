<?php

use App\Http\Controllers\SealController;
use App\Http\Controllers\TerminalController;
use App\Http\Controllers\WireController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('wires', [WireController::class, 'index'])->name('wires.index');
    Route::get('wires/create', [WireController::class, 'create'])->name('wires.create');
    Route::post('wires/store', [WireController::class, 'store'])->name('wires.store');

    Route::post('/wires/import', [WireController::class, 'import'])->name('wires.import');

    Route::get('terminals', [TerminalController::class, 'index'])->name('terminals.index');

    Route::get('/terminals/create', [TerminalController::class, 'create'])->name('terminals.create');

    Route::post('/terminals/store', [TerminalController::class, 'store'])->name('terminals.store');

    Route::post('/terminals/import', [TerminalController::class, 'import'])->name('terminals.import');

    Route::get('seals', [SealController::class, 'index'])->name('seals.index');

    Route::get('seals/create', [SealController::class, 'create'])->name('seals.create');

    Route::post('seals/store', [SealController::class, 'store'])->name('seals.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
