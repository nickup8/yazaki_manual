<?php

namespace App\Imports;

use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CrimpStandardImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Пропускаем полностью пустые строки
            if ($row->filter()->isEmpty()) {
                continue;
            }

            // Ищем terminal по ключу
            $terminal = Terminal::where('terminal_key', $row['terminal'])->first();
            if (! $terminal) {
                // Можно логировать или скипать
                continue;
            }

            // Seal может быть пустым
            $seal = null;
            if (! empty($row['seal'])) {
                $seal = Seal::where('seal_key', $row['seal'])->first();
            }

            // WireType 1 (обязательный)
            $wireType1 = WireType::where('name', $row['wire_type_id_1'])->first();
            if (! $wireType1) {
                // Пропускаем, если не найден
                continue;
            }

            // WireType 2 (опционально)
            $wireType2 = null;
            if (! empty($row['wire_type_id_2'])) {
                $wireType2 = WireType::where('name', $row['wire_type_id_2'])->first();
            }

            // Ищем существующий кримп стандарт по уникальному составному ключу
            $existing = CrimpStandard::where('terminal_id', $terminal->id)
                ->where('seal_id', $seal?->id)
                ->where('type_code_wire_1', $row['type_code_wire_1'])
                ->where('size_code_wire_1', $row['size_code_wire_1'])
                ->where('type_code_wire_2', $row['type_code_wire_2'])
                ->where('size_code_wire_2', $row['size_code_wire_2'])
                ->where('wire_type_id_1', $wireType1->id)
                ->where('wire_type_id_2', $wireType2?->id)
                ->where('customer_code', $row['customer_code'])
                ->first();

            $data = [
                'terminal_id' => $terminal->id,
                'seal_id' => $seal?->id,
                'type_code_wire_1' => $row['type_code_wire_1'],
                'size_code_wire_1' => $row['size_code_wire_1'],
                'wire_type_id_1' => $wireType1->id,
                'cross_section_wire_1' => $this->parseFloat($row['cross_section_wire_1']),
                'type_code_wire_2' => $row['type_code_wire_2'],
                'size_code_wire_2' => $row['size_code_wire_2'],
                'wire_type_id_2' => $wireType2?->id,
                'cross_section_wire_2' => $this->parseFloat($row['cross_section_wire_2']),
                'strip_length' => $this->parseFloat($row['strip_length']),
                'str_tolerance' => $this->parseFloat($row['str_tolerance']),
                'conductor_crimp_height' => $this->parseFloat($row['conductor_crimp_height']),
                'conductor_crimp_height_tolerance' => $this->parseFloat($row['conductor_crimp_height_tolerance']),
                'isolation_crimp_height' => $this->parseFloat($row['isolation_crimp_height']),
                'isolation_crimp_height_tolerance' => $this->parseFloat($row['isolation_crimp_height_tolerance']),
                'conductor_crimp_width_min' => $this->parseFloat($row['conductor_crimp_width_min']),
                'conductor_crimp_width_max' => $this->parseFloat($row['conductor_crimp_width_max']),
                'isolation_crimp_width_min' => $this->parseFloat($row['isolation_crimp_width_min']),
                'isolation_crimp_width_max' => $this->parseFloat($row['isolation_crimp_width_max']),
                'separation_force_wire_1' => $this->parseInt($row['separation_force_wire_1']),
                'separation_force_wire_2' => $this->parseInt($row['separation_force_wire_2']),
                'customer_code' => $row['customer_code'],
                'placement' => $row['placement'],
            ];

            if ($existing) {
                // Обновляем
                $existing->update($data);
            } else {
                // Создаём новый
                CrimpStandard::create($data);
            }
        }
    }

    private function parseFloat($value): ?float
    {
        if (is_null($value) || trim($value) === '') {
            return null;
        }
        $normalized = str_replace(',', '.', trim($value));

        return is_numeric($normalized) ? (float) $normalized : null;
    }

    private function parseInt($value): ?int
    {
        if (is_null($value) || trim($value) === '') {
            return null;
        }
        $normalized = trim($value);

        return is_numeric($normalized) ? (int) $normalized : null;
    }
}
