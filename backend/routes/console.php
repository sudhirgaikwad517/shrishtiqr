<?php

use App\Models\ManufacturingUnit;
use Illuminate\Support\Facades\Artisan;

Artisan::command('manufacturing-units:purge-demo', function () {
    // Exact demo rows from the old seeder — never reintroduce these on deploy.
    $demoRows = [
        ['batch_code' => 'RU', 'fssai_licence_number' => '12216027000292'],
        ['batch_code' => 'PI', 'fssai_licence_number' => '11520024000001'],
        ['batch_code' => 'SD', 'fssai_licence_number' => '10820025000123'],
    ];

    $deleted = 0;
    foreach ($demoRows as $row) {
        $deleted += ManufacturingUnit::query()->where($row)->delete();
    }

    $remaining = ManufacturingUnit::query()->orderBy('id')->pluck('batch_code')->all();

    $this->info("Purged {$deleted} demo manufacturing unit(s).");
    $this->info('Remaining batch codes: '.(empty($remaining) ? '(none)' : implode(', ', $remaining)));
})->purpose('Remove old demo manufacturing units that used to be re-seeded on deploy');
