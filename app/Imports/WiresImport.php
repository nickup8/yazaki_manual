<?php

namespace App\Imports;

use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class WiresImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure, SkipsOnError, WithCustomCsvSettings
{
    use Importable, SkipsFailures, SkipsErrors;

    public function model(array $row)
    {
        $wireType = WireType::where('name', $row['wiretype'])->first();
        $color1 = ($row['color1'] !== '0' && $row['color1'] !== '') ? WireColor::where('short', $row['color1'])->first() : null;
        $color2 = ($row['color2'] !== '0' && $row['color2'] !== '') ? WireColor::where('short', $row['color2'])->first() : null;
        $color3 = ($row['color3'] !== '0' && $row['color3'] !== '') ? WireColor::where('short', $row['color3'])->first() : null;
        $color4 = ($row['color4'] !== '0' && $row['color4'] !== '') ? WireColor::where('short', $row['color4'])->first() : null;

        // Обновление или создание провода по wire_key
        Wire::updateOrCreate(
            ['wire_key' => $row['wirekey']],
            [
                'description'      => $row['name'],
                'wire_type_id'     => $wireType?->id,
                'cross_section'    => $row['crosssection'],
                'wire_color_id_1'  => $color1?->id,
                'wire_color_id_2'  => $color2?->id,
                'wire_color_id_3'  => $color3?->id,
                'wire_color_id_4'  => $color4?->id,
            ]
        );

        return null; // не возвращаем объект модели, т.к. уже сохранили
    }

    public function rules(): array
    {
        $wireTypeNames = WireType::pluck('name')->toArray();
        $colorShorts = WireColor::pluck('short')->toArray();
        $colorShorts[] = '0'; // разрешаем 0 как отсутствие цвета

        return [
            '*.wirekey'      => ['required', 'string'],
            '*.name'         => ['required', 'string'],
            '*.wiretype'     => ['required', Rule::in($wireTypeNames)],
            '*.crosssection' => ['required', 'numeric'],
            '*.color1'       => ['nullable', Rule::in($colorShorts)],
            '*.color2'       => ['nullable', Rule::in($colorShorts)],
            '*.color3'       => ['nullable', Rule::in($colorShorts)],
            '*.color4'       => ['nullable', Rule::in($colorShorts)],
        ];
    }

    public function messages(): array
    {
        return [
            '*.wiretype.in'   => 'Тип провода ":input" не найден.',
            '*.color1.in'     => 'Цвет 1 ":input" не найден.',
            '*.color2.in'     => 'Цвет 2 ":input" не найден.',
            '*.color3.in'     => 'Цвет 3 ":input" не найден.',
            '*.color4.in'     => 'Цвет 4 ":input" не найден.',
        ];
    }

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';', // CSV с точкой с запятой
        ];
    }
}
