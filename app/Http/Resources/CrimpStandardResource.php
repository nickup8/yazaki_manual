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
            'id' => $this->id,
            'terminal' => new TerminalResource($this->terminal),
            'seal' => $this->seal,
            'wire_type_1' => $this->wireType,
            'wire_type_2' => $this->wireType2,
            'type_code_wire_1' => $this->type_code_wire_1,
            'size_code_wire_1' => $this->size_code_wire_1,
            'type_code_wire_2' => $this->type_code_wire_2,
            'size_code_wire_2' => $this->size_code_wire_2,
            
            'cross_section_wire_1' => $this->cross_section_wire_1,
            'cross_section_wire_2' => $this->cross_section_wire_2,
            'strip_length' => $this->strip_length,
            'str_tolerance' => $this->str_tolerance,
            'conductor_crimp_height' => $this->conductor_crimp_height,
            'conductor_crimp_height_tolerance' => $this->conductor_crimp_height_tolerance,
            'isolation_crimp_height' => $this->isolation_crimp_height,
            'isolation_crimp_height_tolerance' => $this->isolation_crimp_height_tolerance,
            'conductor_crimp_width_min' => $this->conductor_crimp_width_min,
            'conductor_crimp_width_max' => $this->conductor_crimp_width_max,
            'isolation_crimp_width_min' => $this->isolation_crimp_width_min,
            'isolation_crimp_width_max' => $this->isolation_crimp_width_max,
            'separation_force_wire_1' => $this->separation_force_wire_1,
            'separation_force_wire_2' => $this->separation_force_wire_2,
            'customer_code' => $this->customer_code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
