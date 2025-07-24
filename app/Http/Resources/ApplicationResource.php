<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
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
            'terminal' => new TerminalResource($this->terminal),
            'inventory_key_application' => $this->resource->inventory_key_application,
            'location' => $this->resource->location,
        ];
    }
}
