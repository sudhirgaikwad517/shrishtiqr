<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Manufacturing units are managed only via Admin panel.
 * This seeder intentionally inserts nothing so deploy never restores deleted rows.
 */
class ManufacturingUnitSeeder extends Seeder
{
    public function run(): void
    {
        // no-op
    }
}
