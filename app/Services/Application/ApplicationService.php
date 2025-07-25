<?php

namespace App\Services\Application;

use App\Models\Application;
use App\Models\Terminal;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class ApplicationService
{
    /**
     * Получить отфильтрованные заявки с пагинацией по запросу.
     *
     * @param Request $request
     * @return Collection|LengthAwarePaginator
     */
    public function getFiltered(Request $request): Collection|LengthAwarePaginator
    {
        $query = Application::query();

        // Фильтр по терминалу
        if ($request->filled('terminal')) {
            $terminal = Terminal::where('terminal_key', $request->input('terminal'))->first();

            if (! $terminal) {
                return collect(); // терминал не найден — возвращаем пустую коллекцию
            }

            $query->where('terminal_id', $terminal->id);
        }

        // Фильтр по инвентарному ключу аппликатора
        if ($request->filled('application')) {
            $query->where('inventory_key_application', $request->input('application'));
        }

        // Если есть фильтры или параметр all, возвращаем пагинацию, иначе пустая коллекция
        if ($request->filled('terminal') || $request->filled('application') || $request->filled('all')) {
            return $query->paginate(10)->withQueryString();
        }

        return collect();
    }

    /**
     * Создать аппликатор из валидированного запроса.
     *
     * @param \Illuminate\Foundation\Http\FormRequest $request
     * @return array
     *
     * @throws \Throwable
     */
    public function createFromRequest($request): array
    {
        $data = $request->validated();

        $terminal = Terminal::where('terminal_key', $data['terminal'])->first();

        if (! $terminal) {
            return [
                'status' => 'error',
                'message' => ['terminal' => 'Терминал не найден.'],
            ];
        }

        try {
            Application::create([
                'terminal_id' => $terminal->id,
                'inventory_key_application' => $data['inventory_key'],
                'location' => $data['location'],
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            // Обработка ошибки дублирования по коду SQLSTATE '23000'
            if ($e->getCode() === '23000') {
                return [
                    'status' => 'error',
                    'message' => ['general' => 'Аппликатор уже существует.'],
                ];
            }

            // Логируем остальные ошибки
            Log::error('Ошибка при создании аппликатора', ['error' => $e->getMessage()]);
            throw $e;
        }

        return [
            'status' => 'success',
            'message' => 'Аппликатор ' . $data['inventory_key'] . ' успешно создан',
        ];
    }
}
