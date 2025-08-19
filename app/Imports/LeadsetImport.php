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

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            // Пропускаем полностью пустые строки
            if ($row->filter()->isEmpty()) {
                continue;
            }

            try {
                $leadsetKey = trim($row['leadset']);
                $prodVersion = $row['prod_version'];
                $description = $row['description'] ?? '';
                $vendorCode = $row['vendor_code'] ?? null;
                $cableClass = $row['cable_class'] ?? null;
                $batchSize = $row['batch_size'] ?? null;
                $planTimeBatch = $row['plan_time_batch'] ?? null;

                if (Leadset::where('leadset', $leadsetKey)->exists()) {
                    $this->errors[] = "Строка {$index}: Leadset {$leadsetKey} уже существует";
                    continue;
                }

                $leadset = Leadset::create([
                    'leadset' => $leadsetKey,
                    'prod_version' => $prodVersion,
                    'description' => $description,
                    'vendor_code' => $vendorCode,
                    'cable_class' => $cableClass,
                    'batch_size' => $batchSize,
                    'plan_time_batch' => $planTimeBatch,
                ]);

                // Привязка проводов (comma separated в колонке wires)
                if (! empty($row['wires'])) {
                    $wireKeys = array_map('trim', explode(',', $row['wires']));
                    $wireIds = Wire::whereIn('wire_key', $wireKeys)->pluck('id')->toArray();
                    $leadset->wires()->sync($wireIds);
                }

                // Привязка терминалов (comma separated, опционально part_strip_length и note)
                if (! empty($row['terminals'])) {
                    $terminalsData = [];
                    $terminals = array_map('trim', explode(',', $row['terminals']));
                    foreach ($terminals as $terminalKey) {
                        $terminal = Terminal::where('terminal_key', $terminalKey)->first();
                        if ($terminal) {
                            $terminalsData[$terminal->id] = [
                                'part_strip_length' => $row['part_strip_length'] ?? null,
                                'note' => $row['note'] ?? null,
                            ];
                        }
                    }
                    $leadset->terminals()->sync($terminalsData);
                }

                // Привязка уплотнителей (comma separated)
                if (! empty($row['seals'])) {
                    $sealKeys = array_map('trim', explode(',', $row['seals']));
                    $sealIds = Seal::whereIn('seal_key', $sealKeys)->pluck('id')->toArray();
                    $leadset->seals()->sync($sealIds);
                }

                $this->successCount++;
            } catch (\Throwable $e) {
                $this->errors[] = "Строка {$index}: Ошибка импорта - {$e->getMessage()}";
                Log::error('Ошибка при импорте Leadset', [
                    'row' => $row->toArray(),
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}
