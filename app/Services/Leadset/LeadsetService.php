<?php

namespace App\Services\Leadset;

use App\Imports\LeadsetImport;
use App\Models\Leadset;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class LeadsetService
{
    /**
     * Получить список leadset с фильтрацией и пагинацией.
     */
    public function getFilteredPaginatedList(array $filters)
    {
        $query = Leadset::query();

        if (! empty($filters['leadset'])) {
            $query->where('leadset', 'like', '%'.$filters['leadset'].'%');
        }

        if (! empty($filters['description'])) {
            $query->where('description', 'like', '%'.$filters['description'].'%');
        }

        $perPage = $filters['per_page'] ?? 10;

        return $query->paginate($perPage)->appends($filters);
    }

    /**
     * Создать Leadset из массива данных (валидированный запрос).
     */
    public function create(array $data): array
    {
        if (Leadset::where('leadset', $data['leadset'])->exists()) {
            return ['success' => false, 'message' => 'Такой Leadset уже существует'];
        }

        $leadset = Leadset::create([
            'leadset' => $data['leadset'],
            'prod_version' => $data['prod_version'],
            'description' => $data['description'],
            'vendor_code' => $data['vendor_code'] ?? null,
            'cable_class' => $data['cable_class'] ?? null,
            'batch_size' => $data['batch_size'] ?? null,
            'plan_time_batch' => $data['plan_time_batch'] ?? null,
        ]);

        // Связи с проводами, терминалами, уплотнителями, если переданы
        if (! empty($data['wires'])) {
            $leadset->wires()->sync($data['wires']);
        }

        if (! empty($data['terminals'])) {
            $leadset->terminals()->sync($data['terminals']);
        }

        if (! empty($data['seals'])) {
            $leadset->seals()->sync($data['seals']);
        }

        return ['success' => true, 'leadset' => $leadset];
    }

    /**
     * Импорт Leadset из Excel/CSV файла
     */
    public function importFromFile(UploadedFile $file): array
    {
        $import = new LeadsetImport;

        try {
            Excel::import($import, $file);

            return [
                'successCount' => $import->successCount,
                'errors' => $import->errors,
            ];
        } catch (\Throwable $e) {
            return [
                'successCount' => 0,
                'errors' => ['Ошибка при импорте: '.$e->getMessage()],
            ];
        }
    }
}
