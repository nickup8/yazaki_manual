<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Http\Request;

class WireController extends Controller
{
    public function __construct(protected \App\Services\Wire\WireService $service) {}

    public function index(Request $request)
    {
        $filters = $request->only([
            'wire_type_id',
            'wire_color_base_id',
            'wire_color_add_id',
            'wire_key',
            'description',
            'all',
            'per_page',
        ]);

        $pagination = null;
        $wires = null;

        $hasFilters = collect($filters)->except(['all', 'per_page'])->filter(fn($v) => !empty($v))->isNotEmpty();
        $shouldLoadData = $hasFilters || !empty($filters['all']);

        if ($shouldLoadData) {
            [$paginated, $wires] = $this->service->getFilteredPaginatedList($filters);
            $pagination = [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'links' => $paginated->linkCollection(),
            ];
        }

        return inertia('wires/wire-index', [
            'wire_types' => WireType::all(),
            'wire_colors' => WireColor::all(),
            'wires' => $wires,
            'pagination' => $pagination,
            'filters' => $filters,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia('wires/wire-create', [
            'wire_types' => WireType::all(),
            'wire_colors' => WireColor::all(),
            'success' => session('success'),
        ]);
    }

    public function store(WireStoreRequest $request)
    {
        $data = $request->validated();

        $result = $this->service->create($data);

        if (! $result['success']) {
            return back()->withErrors(['wire_key' => 'Такой код уже существует.'])->withInput();
        }

        return back()->with('success', 'Провод успешно создан');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimetypes:text/csv,text/plain,application/vnd.ms-excel,application/octet-stream'],
        ]);

        $result = $this->service->importFromFile($request->file('file'));

        if (!empty($result['error'])) {
            return back()->withErrors(['file' => $result['error']]);
        }

        return redirect()->route('wires.index')->with('success', 'Провода успешно импортированы');
    }
}
