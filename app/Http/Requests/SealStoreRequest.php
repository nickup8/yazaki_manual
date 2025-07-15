<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SealStoreRequest extends FormRequest
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
            'seal_key' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'seal_color_id' => ['required', 'exists:seal_colors,id'],
            'seal_spn' => ['nullable', 'string', 'max:255'],
            'seal_supplier' => ['nullable', 'string', 'max:255'],
        ];
    }
}
