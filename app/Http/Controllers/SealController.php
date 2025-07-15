<?php

namespace App\Http\Controllers;

use App\Http\Requests\SealStoreRequest;
use App\Http\Resources\SealColorResource;
use App\Models\Seal;
use App\Models\SealColor;

class SealController extends Controller
{
    public function index()
    {
        return inertia('seals/seal-index');
    }

    public function create()
    {
        $seal_colors = SealColor::all();
        return inertia('seals/seal-create', [
            'seal_colors' => SealColorResource::collection($seal_colors)
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


