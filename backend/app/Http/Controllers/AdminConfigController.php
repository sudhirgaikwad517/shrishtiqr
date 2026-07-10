<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class AdminConfigController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json([
            'public_url' => config('admin.public_url'),
        ]);
    }
}
