<?php

use App\Http\Controllers\CrimpStandardController;
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

    Route::get('crimp_standards', [CrimpStandardController::class, 'index'])->name('crimp_standards.index');

    Route::get('crimp_standards/create', [CrimpStandardController::class, 'create'])->name('crimp_standards.create');

    Route::post('crimp_standards/store', [CrimpStandardController::class, 'store'])->name('crimp_standards.store');

    Route::get('crimp_standards/{crimp_standard}', [CrimpStandardController::class, 'show'])->name('crimp_standards.show');

    Route::get('crimp_standards/{crimp_standard}/edit', [CrimpStandardController::class, 'edit'])->name('crimp_standards.edit');

    Route::put('crimp_standards/{crimp_standard}', [CrimpStandardController::class, 'update'])->name('crimp_standards.update');

    Route::delete('crimp_standards/{crimp_standard}', [CrimpStandardController::class, 'destroy'])->name('crimp_standards.destroy');

    Route::post('/crimp_standards/import', [CrimpStandardController::class, 'import'])->name('crimp_standards.import');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
