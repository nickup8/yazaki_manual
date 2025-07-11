<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WireResource extends JsonResource
{

    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'wire_key' => $this->wire_key,
            'description' => $this->description,
            'wire_type_id' => $this->wire_type,
            'wire_color_base' => $this->wire_color_base,
            'wire_color_add' => $this->wire_color_add,
            'cross_section' => $this->cross_section,
            'wire_color_add2' => $this->wire_color_add2,
            'wire_color_add3' => $this->wire_color_add3,
            'wire_color_add4' => $this->wire_color_add4
        ];
    }
}
