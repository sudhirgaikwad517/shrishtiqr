<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManufacturingUnit extends Model
{
    protected $fillable = [
        'batch_code',
        'company_name',
        'address',
        'fssai_licence_number',
        'sort_order',
    ];
}
