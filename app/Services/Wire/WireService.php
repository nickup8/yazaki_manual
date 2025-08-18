<?php

namespace App\Services\Wire;

use App\Http\Resources\WireResource;
use App\Imports\WiresImport;
use App\Models\Wire;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class WireService
{
    public function getFilteredPaginatedList(array $filters): array
    {
        $query = Wire::query();

        if (! empty($filters['wire_type_id'])) {
            $query->where('wire_type_id', $filters['wire_type_id']);
        }

        if (! empty($filters['wire_color_base_id'])) {
            $query->where('wire_color_id_1', $filters['wire_color_base_id']);
        }

        if (! empty($filters['wire_color_add_id'])) {
            $query->where('wire_color_id_2', $filters['wire_color_add_id']);
        }

        if (! empty($filters['wire_key'])) {
            $query->where('wire_key', 'like', '%'.$filters['wire_key'].'%');
        }

        if (! empty($filters['description'])) {
            $query->where('description', 'like', '%'.$filters['description'].'%');
        }

        $perPage = $filters['per_page'] ?? 10;

        $paginated = $query->paginate($perPage)->withQueryString();

        return [$paginated, WireResource::collection($paginated)];
    }

    public function create(array $data): array
    {
        try {
            $wire = Wire::create([
                'wire_key' => strtoupper($data['wire_key']),
                'description' => $data['description'],
                'wire_type_id' => $data['wire_type_id'],
                'wire_color_id_1' => $data['wire_color_base_id'],
                'wire_color_id_2' => $data['wire_color_add_id'],
                'cross_section' => $data['cross_section'],
            ]);
        } catch (\Exception $e) {
            // Обычно лучше ловить более конкретные исключения, например QueryException с кодом уникальности
            return ['success' => false];
        }

        return [
            'success' => true,
            'wire' => $wire,
        ];
    }

    public function importFromFile(UploadedFile $file): array
    {
        $import = new WiresImport;

        try {
            Excel::import($import, $file);

            return ['success' => true];
        } catch (\Throwable $e) {
            return ['error' => 'Ошибка при импорте: '.$e->getMessage()];
        }
    }
}
