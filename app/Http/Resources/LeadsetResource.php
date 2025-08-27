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
            'terminals' => $this->terminals->map(function ($terminal) {
                return [
                    'id' => $terminal?->id,
                    'terminal_key' => $terminal?->terminal_key,
                    'part_strip_length' => $terminal?->pivot?->part_strip_length,
                    'note' => $terminal?->pivot?->note,
                    'position' => $terminal?->pivot?->position,
                ];
            }),

            // Уплотнители с pivot-данными
            'seals' => $this->seals->map(function ($seal) {
                return [
                    'id' => $seal?->id,
                    'seal_key' => $seal?->seal_key,
                    'position' => $seal?->pivot?->position,
                ];
            }),

            // Провода, если нужно
            'wires' => $this->wires->map(function ($wire) {
                return [
                    'id' => $wire?->id,
                    'wire_key' => $wire?->wire_key,
                    'position' => $wire?->pivot?->position,
                ];
            }),
        ];
    }
}
