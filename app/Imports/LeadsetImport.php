<?php

namespace App\Imports;

use App\Models\Leadset;
use App\Models\Wire;
use App\Models\Terminal;
use App\Models\Seal;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;

class LeadsetImport implements ToCollection, WithHeadingRow
{
    public array $errors = [];
    public int $successCount = 0;

    protected array $map = [
        'leadset'       => 'leadset',
        'prodversion'   => 'prod_version',
        'description'   => 'description',
        'vendorcode'    => 'vendor_code',
        'cableclass'    => 'cable_class',
        'batchsize'     => 'batch_size',
        'plantimebatch' => 'plan_time_batch',

        // провода
        'wire1key' => 'wire1_key',
        'wire2key' => 'wire2_key',
        'wire3key' => 'wire3_key',

        // терминалы
        'terminal1key' => 'terminal1_key',
        'terminal2key' => 'terminal2_key',
        'terminal3key' => 'terminal3_key',

        // уплотнители
        'seal1key' => 'seal1_key',
        'seal2key' => 'seal2_key',
        'seal3key' => 'seal3_key',
    ];

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            if ($row->filter()->isEmpty()) continue;

            try {
                $rowArray = array_change_key_case($row->toArray(), CASE_LOWER);

                $normalized = [];
                foreach ($this->map as $source => $target) {
                    $normalized[$target] = $rowArray[$source] ?? null;
                }

                $leadset = Leadset::updateOrCreate(
                    ['leadset' => trim($normalized['leadset'])],
                    [
                        'prod_version'    => $normalized['prod_version'],
                        'description'     => $normalized['description'] ?? '',
                        'vendor_code'     => $normalized['vendor_code'] ?? null,
                        'cable_class'     => $normalized['cable_class'] ?? null,
                        'batch_size'      => $normalized['batch_size'] ?? null,
                        'plan_time_batch' => $normalized['plan_time_batch'] ?? null,
                    ]
                );

                // === Провода ===
                $wireKeys = [
                    $normalized['wire1_key'],
                    $normalized['wire2_key'],
                    $normalized['wire3_key'],
                ];

                $leadset->wires()->detach();
                foreach ($wireKeys as $pos => $key) {
                    $wireId = $key ? Wire::where('wire_key', $key)->value('id') : null;
                    $leadset->wires()->attach($wireId, ['position' => $pos]);
                }

                // === Терминалы ===
                $terminalKeys = [
                    $normalized['terminal1_key'],
                    $normalized['terminal2_key'],
                    $normalized['terminal3_key'],
                ];

                $leadset->terminals()->detach();
                foreach ($terminalKeys as $pos => $key) {
                    $terminal = $key ? Terminal::where('terminal_key', $key)->first() : null;
                    $leadset->terminals()->attach(
                        $terminal?->id,
                        [
                            'position'          => $pos,
                            'part_strip_length' => $normalized['part_strip_length'] ?? null,
                            'note'              => $normalized['note'] ?? null,
                        ]
                    );
                }

                // === Уплотнители ===
                $sealKeys = [
                    $normalized['seal1_key'],
                    $normalized['seal2_key'],
                    $normalized['seal3_key'],
                ];

                $leadset->seals()->detach();
                foreach ($sealKeys as $pos => $key) {
                    $sealId = $key ? Seal::where('seal_key', $key)->value('id') : null;
                    $leadset->seals()->attach($sealId, ['position' => $pos]);
                }

                $this->successCount++;
            } catch (\Throwable $e) {
                $this->errors[] = "Строка {$index}: Ошибка импорта - {$e->getMessage()}";
                Log::error('Ошибка при импорте Leadset', [
                    'row'   => $row->toArray(),
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}
