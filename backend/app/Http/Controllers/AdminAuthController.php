<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        if (! hash_equals((string) config('admin.password'), $request->password)) {
            return response()->json(['message' => 'Invalid password.'], 401);
        }

        return response()->json([
            'token' => config('admin.api_token'),
        ]);
    }
}
