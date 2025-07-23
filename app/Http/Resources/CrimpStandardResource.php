<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CrimpStandardResource extends JsonResource
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
            'terminal' => new TerminalResource($this->resource->terminal),
            'seal' => $this->resource->seal,
            'wire_type_1' => $this->resource->wireType,
            'wire_type_2' => $this->resource->wireType2,
            'type_code_wire_1' => $this->resource->type_code_wire_1,
            'size_code_wire_1' => $this->resource->size_code_wire_1,
            'type_code_wire_2' => $this->resource->type_code_wire_2,
            'size_code_wire_2' => $this->resource->size_code_wire_2,

            'cross_section_wire_1' => $this->resource->cross_section_wire_1,
            'cross_section_wire_2' => $this->resource->cross_section_wire_2,
            'strip_length' => $this->resource->strip_length,
            'str_tolerance' => $this->resource->str_tolerance,
            'conductor_crimp_height' => $this->resource->conductor_crimp_height,
            'conductor_crimp_height_tolerance' => $this->resource->conductor_crimp_height_tolerance,
            'isolation_crimp_height' => $this->resource->isolation_crimp_height,
            'isolation_crimp_height_tolerance' => $this->resource->isolation_crimp_height_tolerance,
            'conductor_crimp_width_min' => $this->resource->conductor_crimp_width_min,
            'conductor_crimp_width_max' => $this->resource->conductor_crimp_width_max,
            'isolation_crimp_width_min' => $this->resource->isolation_crimp_width_min,
            'isolation_crimp_width_max' => $this->resource->isolation_crimp_width_max,
            'separation_force_wire_1' => $this->resource->separation_force_wire_1,
            'separation_force_wire_2' => $this->resource->separation_force_wire_2,
            'customer_code' => $this->resource->customer_code,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'placement' => $this->resource->placement,
        ];
    }
}
