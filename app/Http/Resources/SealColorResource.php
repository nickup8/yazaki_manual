<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SealColorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'color_name' => $this->resource->color_name,
            'color_hex' => $this->resource->color_hex,
            'color_short' => $this->resource->color_short,
        ];
    }
}
