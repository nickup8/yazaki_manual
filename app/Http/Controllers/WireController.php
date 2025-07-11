<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Http\Resources\WireResource;
use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\ResponseFactory;

class WireController extends Controller
{
    public function index() {
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        $wires = WireResource::collection(Wire::all());
        return inertia('wires/wire-index', [
            'wire_types' => $wire_types,
            'wire_colors' => $wire_colors,
            'success' => session('success'),
            'wires' => $wires
        ]);
    }

    public function create() {
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        return inertia('wires/wire-create', [
            'wire_types' => $wire_types,
            'wire_colors' => $wire_colors,
            'success' => session('success')
        ]);
    }

    public function store(WireStoreRequest $request)
    {
        $data = $request->validated();
        
        $wire = Wire::create([
            'wire_key' => strtoupper($data['wire_key']),
            'description' => $data['description'],
            'wire_type_id' => $data['wire_type_id'],
            'wire_color_id_1' => $data['wire_color_base_id'],
            'wire_color_id_2' => $data['wire_color_add_id'],
            'cross_section' => $data['cross_section']
        ]);

        return back()->with('success', 'Провод ' . $wire->wire_key . ' успешно создан');
    }
}
