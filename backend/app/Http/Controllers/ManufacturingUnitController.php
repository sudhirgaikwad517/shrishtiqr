<?php

namespace App\Http\Controllers;

use App\Models\ManufacturingUnit;
use Illuminate\Http\JsonResponse;

class ManufacturingUnitController extends Controller
{
    public function index(): JsonResponse
    {
        $units = ManufacturingUnit::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get([
                'id',
                'batch_code',
                'company_name',
                'address',
                'fssai_licence_number',
                'sort_order',
            ]);

        return response()->json($units);
    }
}
