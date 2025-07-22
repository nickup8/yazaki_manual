<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TerminalResource extends JsonResource
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
            'terminal_key' => $this->resource->terminal_key,
            'terminal_spn' => $this->resource->terminal_spn,
            'terminal_supplier' => $this->resource->terminal_supplier,
            'description' => $this->resource->description,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
