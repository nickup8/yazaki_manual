<?php 

namespace App\Services\Application;

use App\Models\Application;
use App\Models\Terminal;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class ApplicationService
{
    public function getFiltered(Request $request): Collection|\Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $query = Application::query();

        if ($request->filled('terminal')) {
            $terminal = Terminal::where('terminal_key', $request->input('terminal'))->first();
            if (! $terminal) {
                return collect(); // терминал не найден
            }
            $query->where('terminal_id', $terminal->id);
        }

        if ($request->filled('application')) {
            $query->where('inventory_key_application', $request->input('application'));
        }

        return ($request->filled('terminal') || $request->filled('application') || $request->filled('all'))
            ? $query->paginate(10)->withQueryString()
            : collect();
    }

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
            if ($e->getCode() === '23000') {
                return [
                    'status' => 'error',
                    'message' => ['general' => 'Аппликатор уже существует.'],
                ];
            }

            Log::error('Ошибка при создании аппликатора', ['error' => $e->getMessage()]);
            throw $e;
        }

        return [
            'status' => 'success',
            'message' => 'Аппликатор успешно создан',
        ];
    }
}
