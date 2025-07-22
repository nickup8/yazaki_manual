<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrimpStandardStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'terminal' => 'required|exists:terminals,terminal_key',
            'seal' => 'nullable|exists:seals,seal_key',
            'type_code_wire_1' => 'required|string',
            'size_code_wire_1' => 'required|string',
            'type_code_wire_2' => 'nullable|string',
            'size_code_wire_2' => 'nullable|string',
            'wire_type_id_1' => 'required|exists:wire_types,id',
            'cross_section_wire_1' => ['required', 'numeric', 'between:0,99.99'],
            'wire_type_id_2' => 'nullable|exists:wire_types,id',
            'cross_section_wire_2' => ['nullable', 'numeric', 'between:0,99.99'],
            'strip_length' => ['required', 'numeric', 'between:0,99.99'],
            'str_tolerance' => ['required', 'numeric', 'between:0,99.99'],
            'conductor_crimp_height' => ['required', 'numeric', 'between:0,99.99'],
            'conductor_crimp_height_tolerance' => ['required', 'numeric', 'between:0,99.99'],
            'isolation_crimp_height' => ['required', 'numeric', 'between:0,99.99'],
            'isolation_crimp_height_tolerance' => ['required', 'numeric', 'between:0,99.99'],
            'conductor_crimp_width_min' => ['required', 'numeric', 'between:0,99.99'],
            'conductor_crimp_width_max' => ['required', 'numeric', 'between:0,99.99'],
            'isolation_crimp_width_min' => ['required', 'numeric', 'between:0,99.99'],
            'isolation_crimp_width_max' => ['required', 'numeric', 'between:0,99.99'],
            'separation_force_wire_1' => ['required', 'integer', 'between:0,2000'],
            'separation_force_wire_2' => ['nullable', 'integer', 'between:0,2000'],
            'customer_code' => ['required', 'string', 'max:255'],
            'placement' => ['nullable', 'string', 'max:255', 'in:Внакладку,Рядом'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->sometimes(['wire_type_id_2', 'cross_section_wire_2'], ['required'], function ($input) {
            return $input->type_code_wire_2 !== null && $input->type_code_wire_2 !== '' &&
                   $input->size_code_wire_2 !== null && $input->size_code_wire_2 !== '';
        });
    }
}
