<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('batches');

        Schema::create('manufacturing_units', function (Blueprint $table) {
            $table->id();
            $table->string('batch_code', 10)->unique();
            $table->string('company_name');
            $table->text('address');
            $table->string('fssai_licence_number');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('manufacturing_units');
    }
};
