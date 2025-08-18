<?php

namespace App\Services\CrimpStandard;

use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;
use Illuminate\Http\Request;

class CrimpStandardService
{
    public function getFiltered(Request $request)
    {
        $query = CrimpStandard::query();

        if ($request->filled('terminal')) {
            $terminal = Terminal::where('terminal_key', $request->input('terminal'))->first();
            if (! $terminal) {
                return collect();
            }
            $query->where('terminal_id', $terminal->id);
        }

        if ($request->filled('seal')) {
            $seal = Seal::where('seal_key', $request->input('seal'))->first();
            if (! $seal) {
                return collect();
            }
            $query->where('seal_id', $seal->id);
        }

        return ($request->filled('terminal') || $request->filled('seal') || $request->filled('all'))
            ? $query->paginate(10)->withQueryString()
            : collect();
    }

    public function createFromRequest($request): array
    {
        $data = $request->validated();

        $terminal = Terminal::where('terminal_key', $data['terminal'])->first();
        if (! $terminal) {
            return ['status' => 'error', 'message' => ['terminal' => 'Терминал не найден.']];
        }

        $seal = null;
        if (! empty($data['seal'])) {
            $seal = Seal::where('seal_key', $data['seal'])->first();
            if (! $seal) {
                return ['status' => 'error', 'message' => ['seal' => 'Уплотнитель не найден.']];
            }
        }

        if (! WireType::where('id', $data['wire_type_id_1'])->exists()) {
            return ['status' => 'error', 'message' => ['wire_type_id_1' => 'Тип провода 1 не найден.']];
        }

        if (! empty($data['wire_type_id_2']) && ! WireType::where('id', $data['wire_type_id_2'])->exists()) {
            return ['status' => 'error', 'message' => ['wire_type_id_2' => 'Тип провода 2 не найден.']];
        }

        CrimpStandard::create([
            ...$request->safe()->except(['terminal', 'seal']),
            'terminal_id' => $terminal->id,
            'seal_id' => $seal?->id,
        ]);

        return ['status' => 'success', 'message' => 'Кримп-стандарт '.$terminal->terminal_key.' успешно создан'];
    }
}
