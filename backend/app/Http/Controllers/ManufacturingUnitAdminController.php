<?php

namespace App\Http\Controllers;

use App\Models\ManufacturingUnit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ManufacturingUnitAdminController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            ManufacturingUnit::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'batch_code' => ['required', 'string', 'max:10', 'unique:manufacturing_units,batch_code'],
            'company_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'fssai_licence_number' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $unit = ManufacturingUnit::create([
            ...$data,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return response()->json($unit, 201);
    }

    public function update(Request $request, ManufacturingUnit $manufacturingUnit): JsonResponse
    {
        $data = $request->validate([
            'batch_code' => ['required', 'string', 'max:10', 'unique:manufacturing_units,batch_code,'.$manufacturingUnit->id],
            'company_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'fssai_licence_number' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $manufacturingUnit->update([
            ...$data,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return response()->json($manufacturingUnit);
    }

    public function destroy(ManufacturingUnit $manufacturingUnit): JsonResponse
    {
        $manufacturingUnit->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
