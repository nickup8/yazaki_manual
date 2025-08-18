<?php

namespace App\Services\Terminal;

use App\Imports\TerminalsImport;
use App\Models\Terminal;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;

class TerminalService
{
    /**
     * Получить пагинированный список терминалов.
     * Если фильтров нет и all не передан — вернуть пустую пагинацию.
     *
     * @return LengthAwarePaginator|array Пагинация с данными или пустой массив
     */
    public function getFilteredPaginatedList(array $filters)
    {
        $hasFilters = ! empty($filters['terminal_key']) || ! empty($filters['terminal_spn']);
        $shouldLoadData = $hasFilters || ! empty($filters['all']);

        if (! $shouldLoadData) {
            // Возвращаем пустую пагинацию с нулями
            return $this->emptyPagination();
        }

        $query = Terminal::query();

        if (! empty($filters['terminal_key'])) {
            $query->where('terminal_key', $filters['terminal_key']);
        }

        if (! empty($filters['terminal_spn'])) {
            $query->where('terminal_spn', 'like', '%'.$filters['terminal_spn'].'%');
        }

        return $query
            ->paginate(10)
            ->appends(Arr::only($filters, ['terminal_key', 'terminal_spn', 'all']));
    }

    protected function emptyPagination(): LengthAwarePaginator
    {
        // Создаем пустой LengthAwarePaginator, чтобы Inertia и ресурс нормально отработали
        return new LengthAwarePaginator([], 0, 10);
    }

    public function create(array $data): array
    {
        if (Terminal::where('terminal_key', $data['terminal_key'])->exists()) {
            return ['success' => false];
        }

        $terminal = Terminal::create($data);

        return [
            'success' => true,
            'terminal' => $terminal,
        ];
    }

    public function importFromFile(UploadedFile $file): array
    {
        $import = new TerminalsImport;

        try {
            Excel::import($import, $file);

            return [
                'successCount' => $import->successCount,
                'skippedCount' => $import->skippedCount,
                'importErrors' => $import->errors,
            ];
        } catch (\Throwable $e) {
            return ['importErrors' => ['Ошибка при импорте: '.$e->getMessage()]];
        }
    }
}
