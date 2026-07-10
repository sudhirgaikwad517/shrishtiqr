<?php

namespace Database\Seeders;

use App\Models\ManufacturingUnit;
use Illuminate\Database\Seeder;

class ManufacturingUnitSeeder extends Seeder
{
    public function run(): void
    {
        $units = [
            [
                'batch_code' => 'RU',
                'company_name' => 'Rajendra And Ursula Joshi Food Industries Pvt. Ltd.',
                'address' => 'DTA-005-008 & 009, Domestic Tariff Area, Mahindra World City, Jaipur - 302037, Rajasthan, India.',
                'fssai_licence_number' => '12216027000292',
                'sort_order' => 1,
            ],
            [
                'batch_code' => 'PI',
                'company_name' => 'Provilac Dairy & Foods Pvt. Ltd.',
                'address' => 'Plot No. 45, Industrial Estate, Pune - 411001, Maharashtra, India.',
                'fssai_licence_number' => '11520024000001',
                'sort_order' => 2,
            ],
            [
                'batch_code' => 'SD',
                'company_name' => 'Shrishti Dairy Pvt. Ltd.',
                'address' => 'Unit #12, Industrial Area, Sector 5, Gurgaon - 122001, Haryana, India.',
                'fssai_licence_number' => '10820025000123',
                'sort_order' => 3,
            ],
        ];

        foreach ($units as $unit) {
            ManufacturingUnit::updateOrCreate(
                ['batch_code' => $unit['batch_code']],
                $unit
            );
        }
    }
}
