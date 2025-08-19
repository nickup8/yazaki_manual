<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LeadsetStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'leadset' => ['required', 'string', 'max:255', 'unique:leadsets,leadset'],
            'prod_version' => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string', 'max:1000'],
            'vendor_code' => ['nullable', 'string', 'max:255'],
            'cable_class' => ['nullable', 'string', 'max:255'],
            'batch_size' => ['nullable', 'integer', 'min:1'],
            'plan_time_batch' => ['nullable', 'numeric', 'between:0,9999.99'],

            // Провода (wire_ids) — массив существующих ID
            'wires' => ['required', 'array', 'min:1'],
            'wires.*' => ['integer', 'exists:wires,id'],

            // Терминалы с дополнительными полями
            'terminals' => ['nullable', 'array'],
            'terminals.*.terminal_id' => ['required', 'integer', 'exists:terminals,id'],
            'terminals.*.part_strip_length' => ['nullable', 'numeric', 'between:0,99.99'],
            'terminals.*.note' => ['nullable', 'string', 'max:1000'],

            // Уплотнители
            'seals' => ['nullable', 'array'],
            'seals.*' => ['integer', 'exists:seals,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'leadset.unique' => 'Leadset с таким именем уже существует.',
            'wires.required' => 'Выберите хотя бы один провод для Leadset.',
            'wires.*.exists' => 'Выбранный провод не существует.',
            'terminals.*.terminal_id.exists' => 'Выбранный терминал не найден.',
            'seals.*.exists' => 'Выбранный уплотнитель не найден.',
        ];
    }
}
