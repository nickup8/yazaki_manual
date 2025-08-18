<?php

namespace App\Services\Seal;

use App\Models\Seal;
use App\Models\SealColor;
use Illuminate\Http\Request;

class SealService
{
    public function getFiltered(Request $request)
    {
        $hasFilters = $request->filled('seal_key') || $request->filled('seal_spn');
        $shouldLoadData = $hasFilters || $request->boolean('all');

        if (! $shouldLoadData) {
            return collect(); // пустая коллекция
        }

        $query = Seal::query();

        if ($request->filled('seal_key')) {
            $query->where('seal_key', $request->input('seal_key'));
        }

        if ($request->filled('seal_spn')) {
            $query->where('seal_spn', 'like', '%'.$request->input('seal_spn').'%');
        }

        return $query->paginate(10)->appends($request->all());
    }

    public function createFromRequest($request): array
    {
        $data = $request->validated();

        $color = SealColor::find($data['seal_color_id']);
        if (! $color) {
            return [
                'status' => 'error',
                'message' => ['seal_color_id' => 'Цвет уплотнителя не найден.'],
            ];
        }

        $seal = Seal::create([
            'seal_key' => $data['seal_key'],
            'seal_spn' => $data['seal_spn'],
            'seal_supplier' => $data['seal_supplier'],
            'description' => $data['description'],
            'seal_color_id' => $color->id,
        ]);

        return [
            'status' => 'success',
            'message' => 'Уплотнитель '.$seal->seal_key.' успешно создан',
        ];
    }
}
