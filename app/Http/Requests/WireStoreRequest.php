<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WireStoreRequest extends FormRequest
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
            'wire_key' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'wire_type_id' => ['required', 'integer', 'exists:wire_types,id'],
            'wire_color_base_id' => ['required', 'integer', 'exists:wire_colors,id'],
            'wire_color_add_id' => ['nullable', 'integer', 'exists:wire_colors,id'],
            'cross_section' => ['required', 'numeric', 'between:0,99.99'],
        ];
    }
}
