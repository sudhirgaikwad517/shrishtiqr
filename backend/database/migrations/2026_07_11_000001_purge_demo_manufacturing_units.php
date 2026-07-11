<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('manufacturing_units')) {
            return;
        }

        DB::table('manufacturing_units')
            ->where(function ($query) {
                $query->where(function ($q) {
                    $q->where('batch_code', 'RU')
                        ->where('fssai_licence_number', '12216027000292');
                })->orWhere(function ($q) {
                    $q->where('batch_code', 'PI')
                        ->where('fssai_licence_number', '11520024000001');
                })->orWhere(function ($q) {
                    $q->where('batch_code', 'SD')
                        ->where('fssai_licence_number', '10820025000123');
                });
            })
            ->delete();
    }

    public function down(): void
    {
        // irreversible cleanup
    }
};
