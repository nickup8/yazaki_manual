<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Http\Resources\WireResource;
use App\Imports\WiresImport;
use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\ResponseFactory;
use Maatwebsite\Excel\Facades\Excel;

class WireController extends Controller
{
    public function index(Request $request)
    {
        $hasFilters = $request->filled('wire_type_id') ||
                    $request->filled('wire_color_base_id') ||
                    $request->filled('wire_color_add_id') ||
                    $request->filled('wire_key') ||
                    $request->filled('description') ||
                    $request->filled('all');

        $wires = collect(); // Пустая коллекция по умолчанию

        if ($hasFilters) {
            $query = Wire::query();

            if ($request->filled('wire_type_id')) {
                $query->where('wire_type_id', $request->input('wire_type_id'));
            }

            if ($request->filled('wire_color_base_id')) {
                $query->where('wire_color_id_1', $request->input('wire_color_base_id'));
            }

            if ($request->filled('wire_color_add_id')) {
                $query->where('wire_color_id_2', $request->input('wire_color_add_id'));
            }

            if ($request->filled('wire_key')) {
                $query->where('wire_key', 'like', '%' . $request->input('wire_key') . '%');
            }

            if ($request->filled('description')) {
                $query->where('description', 'like', '%' . $request->input('description') . '%');
            }

            // Можно оставить как маркер полного запроса
            if ($request->filled('all')) {
                // Ничего не делаем, просто возвращаем всё с учетом других условий
            }

            $wires = WireResource::collection($query->get());
        }

        return inertia('wires/wire-index', [
            'wire_types' => WireType::all(),
            'wire_colors' => WireColor::all(),
            'wires' => $wires,
            'filters' => $request->only([
                'wire_type_id',
                'wire_color_base_id',
                'wire_color_add_id',
                'wire_key',
                'description',
                'all'
            ]),
            'success' => session('success'),
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

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimetypes:text/csv,text/plain,application/vnd.ms-excel,application/octet-stream',
        ]);

        Excel::import(new WiresImport, $request->file('file'));

        return redirect()->route('wires.index')->with('success', 'Провода успешно импортированы');
    }
}
