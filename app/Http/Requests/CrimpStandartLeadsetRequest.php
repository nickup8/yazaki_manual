<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrimpStandartLeadsetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'terminal' => ['nullable', 'exists:terminals,terminal_id'],
            'seal' => ['nullable', 'exists:seals,seal_id'],
            'wired' => ['nullable', 'exists:wires,wire_id'],
        ];
    }
}
