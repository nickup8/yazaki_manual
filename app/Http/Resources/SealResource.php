<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'seal_key' => $this->seal_key,
            'seal_spn' => $this->seal_spn,
            'seal_supplier' => $this->seal_supplier,
            'description' => $this->description,
            'seal_color' => new SealColorResource($this->seal_color),
        ];
    }
}
