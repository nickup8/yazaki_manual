<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


 /**
 * @mixin \App\Models\Seal
 */
class SealResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'seal_key' => $this->resource->seal_key,
            'seal_spn' => $this->resource->seal_spn,
            'seal_supplier' => $this->resource->seal_supplier,
            'description' => $this->resource->description,
            'seal_color' => new SealColorResource($this->seal_color),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}