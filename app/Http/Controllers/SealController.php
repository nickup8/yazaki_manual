<?php

namespace App\Http\Controllers;

use App\Http\Requests\SealStoreRequest;
use App\Http\Resources\SealColorResource;
use App\Http\Resources\SealResource;
use App\Models\Seal;
use App\Models\SealColor;
use Illuminate\Http\Request;

class SealController extends Controller
{
    public function index(Request $request)
    {
        $hasFilters = $request->filled('seal_key') || $request->filled('seal_spn');
        $shouldLoadData = $hasFilters || $request->boolean('all');

        $seals = [];

        if ($shouldLoadData) {
            $query = Seal::query();

            if ($request->filled('seal_key')) {
                $query->where('seal_key', $request->input('seal_key'));
            }

            if ($request->filled('seal_spn')) {
                $query->where('seal_spn', 'like', '%'.$request->input('seal_spn').'%');
            }

            $seals = $query->paginate(10)->appends($request->all());
        }

        return inertia('seals/seal-index', [
            'seals' => SealResource::collection($seals),
        ]);
    }

    public function create()
    {
        $seal_colors = SealColor::all();

        return inertia('seals/seal-create', [
            'seal_colors' => SealColorResource::collection($seal_colors),
        ]);
    }

    public function store(SealStoreRequest $request)
    {
        $data = $request->validated();

        $color = SealColor::find($data['seal_color_id']);

        $seal = Seal::create([
            'seal_key' => $data['seal_key'],
            'seal_spn' => $data['seal_spn'],
            'seal_supplier' => $data['seal_supplier'],
            'description' => $data['description'],
            'seal_color_id' => $color->id,
        ]);

        // dd($seal);
        return back()->with('success', 'Уплотнитель '.$seal->seal_key.' успешно создан');
    }
}
