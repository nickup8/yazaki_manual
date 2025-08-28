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
            'id' => $this->resource->id,
            'wire_key' => $this->resource->wire_key,
            'description' => $this->resource->description,
            'wire_type' => $this->resource->wire_type,
            'wire_color_base' => $this->resource->wire_color_base,
            'wire_color_add' => $this->resource->wire_color_add,
            'cross_section' => $this->resource->cross_section,
            'wire_color_add2' => $this->resource->wire_color_add2,
            'wire_color_add3' => $this->resource->wire_color_add3,
            'wire_color_add4' => $this->resource->wire_color_add4,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'wire_name' => $this->pivot?->wire_name,
        'position' => $this->pivot?->position,
        ];
    }
}
