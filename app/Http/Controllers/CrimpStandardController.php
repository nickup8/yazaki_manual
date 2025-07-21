<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrimpStandardStoreRequest;
use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;

class CrimpStandardController extends Controller
{
    public function index()
    {
        return inertia('crimp-standarts/crimp-standarts-index');
    }

    public function create()
    {
        $wire_types = WireType::all();

        return inertia('crimp-standarts/crimp-standarts-create',
            [
                'wire_types' => $wire_types,
                'success' => session('success'),
            ]);
    }

    public function store(CrimpStandardStoreRequest $request)
    {
        $data = $request->validated();

        // Найти терминал по ключу или вернуть ошибку
        $terminal = Terminal::where('terminal_key', $data['terminal'])->first();
        if (! $terminal) {
            return back()->withErrors(['terminal' => 'Терминал не найден.']);
        }

        // Уплотнитель по ключу (может быть пустым)
        $seal = null;
        if (! empty($data['seal'])) {
            $seal = Seal::where('seal_key', $data['seal'])->first();
            if (! $seal) {
                return back()->withErrors(['seal' => 'Уплотнитель не найден.']);
            }
        }

        // Проверка существования типа провода 1 (обязателен)
        if (! WireType::where('id', $data['wire_type_id_1'])->exists()) {
            return back()->withErrors(['wire_type_id_1' => 'Тип провода 1 не найден.']);
        }

        // Проверка типа провода 2 (если указан)
        if (! empty($data['wire_type_id_2']) && ! WireType::where('id', $data['wire_type_id_2'])->exists()) {
            return back()->withErrors(['wire_type_id_2' => 'Тип провода 2 не найден.']);
        }

        // Создание записи
        $crimpStandard = CrimpStandard::create([
            ...$request->safe()->except(['terminal', 'seal']),
            'terminal_id' => $terminal->id,
            'seal_id' => $seal?->id,
        ]);

        return back()->with('success', 'Кримп-стандарт успешно создан');
    }
}
