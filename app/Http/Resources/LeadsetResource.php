<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadsetResource extends JsonResource
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
            'leadset' => $this->leadset,
            'prod_version' => $this->prod_version,
            'description' => $this->description,
            'vendor_code' => $this->vendor_code,
            'cable_class' => $this->cable_class,
            'batch_size' => $this->batch_size,
            'plan_time_batch' => $this->plan_time_batch,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Терминалы с pivot-данными
            'terminals' => TerminalResource::collection($this->terminals),
        'seals' => SealResource::collection($this->seals),
        'wires' => WireResource::collection($this->wires),
        ];
        
    }
}
