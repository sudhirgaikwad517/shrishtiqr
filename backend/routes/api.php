<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminConfigController;
use App\Http\Controllers\ManufacturingUnitAdminController;
use App\Http\Controllers\ManufacturingUnitController;
use Illuminate\Support\Facades\Route;

Route::get('/manufacturing-units', [ManufacturingUnitController::class, 'index']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('admin')->prefix('admin')->group(function () {
    Route::get('/config', [AdminConfigController::class, 'show']);
    Route::get('/manufacturing-units', [ManufacturingUnitAdminController::class, 'index']);
    Route::post('/manufacturing-units', [ManufacturingUnitAdminController::class, 'store']);
    Route::put('/manufacturing-units/{manufacturingUnit}', [ManufacturingUnitAdminController::class, 'update']);
    Route::delete('/manufacturing-units/{manufacturingUnit}', [ManufacturingUnitAdminController::class, 'destroy']);
});
