<?php

namespace App\Imports;

use App\Models\Terminal;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TerminalsImport implements ToCollection, WithCustomCsvSettings, WithHeadingRow
{
    public int $successCount = 0;
    public int $skippedCount = 0;
    public array $errors = [];

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            $line = $index + 2; // строка в CSV-файле (с учетом заголовков)

            $data = [
                'terminal_key' => trim($row['terminal_key'] ?? ''),
                'terminal_spn' => trim($row['terminal_spn'] ?? ''),
                'terminal_supplier' => trim($row['terminal_supplier'] ?? ''),
                'description' => trim($row['description'] ?? ''),
            ];

            // Валидация строки
            $validator = Validator::make($data, [
                'terminal_key' => 'required|string|max:255',
                'terminal_spn' => 'nullable|string|max:255',
                'terminal_supplier' => 'nullable|string|max:255',
                'description' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                $this->skippedCount++;
                $this->errors[] = "Строка $line: " . implode(', ', $validator->errors()->all());
                continue;
            }

            try {
                // Создание или обновление
                Terminal::updateOrCreate(
                    ['terminal_key' => $data['terminal_key']],
                    [
                        'terminal_spn' => $data['terminal_spn'],
                        'terminal_supplier' => $data['terminal_supplier'],
                        'description' => $data['description'],
                    ]
                );

                $this->successCount++;
            } catch (\Exception $e) {
                // Логгирование ошибок на всякий случай
                Log::error("Ошибка в строке $line: " . $e->getMessage());
                $this->skippedCount++;
                $this->errors[] = "Строка $line: ошибка при сохранении — " . $e->getMessage();
            }
        }
    }

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';',
            'input_encoding' => 'UTF-8',
        ];
    }
}
