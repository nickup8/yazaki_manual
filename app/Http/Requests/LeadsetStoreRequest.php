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
        $leadsetId = $this->route('leadset')?->id; 
        // или $this->leadset, если биндинг по модели

        return [
            'Leadset' => [
                'required',
                'string',
                'max:255',
                Rule::unique('leadsets', 'leadset')->ignore($leadsetId),
            ],
            'ProdVersion' => ['required', 'integer', 'min:1'],
            'Description' => ['required', 'string', 'max:1000'],
            'VendorCode' => ['nullable', 'string', 'max:255'],
            'CableClass' => ['nullable', 'string', 'max:255'],
            'BatchSize' => ['nullable', 'integer', 'min:1'],
            'PlanTimeBatch' => ['nullable', 'numeric', 'between:0,9999.99'],

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
