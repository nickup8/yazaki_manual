<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrimpStandartLeadsetRequest;
use App\Http\Requests\LeadsetStoreRequest;
use App\Http\Resources\CrimpStandardResource;
use App\Http\Resources\LeadsetResource;
use App\Models\Leadset;
use App\Models\Wire;
use App\Models\Terminal;
use App\Models\Seal;
use App\Services\Leadset\LeadsetService;
use Illuminate\Http\Request;

class LeadsetController extends Controller
{
    public function __construct(protected LeadsetService $service) {}

    /**
     * Список Leadset с фильтрацией и пагинацией
     */
    public function index(Request $request)
{
    $filters = $request->only([
        'leadset',
        'description',
        'all',
        'per_page',
    ]);

    $leadsets = collect(); // пустая коллекция по умолчанию
    $pagination = null;

    $hasFilters = collect($filters)->except(['all', 'per_page'])->filter(fn($v) => !empty($v))->isNotEmpty();
    $shouldLoadData = $hasFilters || !empty($filters['all']);

    if ($shouldLoadData) {
        $paginated = $this->service->getFilteredPaginatedList($filters);

        // Используем коллекцию моделей вместо массива
        $leadsets = $paginated->getCollection();

        $pagination = [
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
            'per_page' => $paginated->perPage(),
            'total' => $paginated->total(),
            'links' => $paginated->linkCollection(),
        ];
    }

    return inertia('leadsets/leadset-index', [
        'leadsets' => LeadsetResource::collection($leadsets),
        'pagination' => $pagination,
        'filters' => $filters,
        'success' => session('success'),
    ]);
}


    /**
     * Форма создания Leadset
     */
    public function create()
    {
        return inertia('leadsets/leadset-create', [
            'wires' => Wire::all(),
            'terminals' => Terminal::all(),
            'seals' => Seal::all(),
            'success' => session('success'),
        ]);
    }

    /**
     * Сохранение нового Leadset
     */
    public function store(LeadsetStoreRequest $request)
    {
        $data = $request->validated();

        $result = $this->service->create($data);

        if (! $result['success']) {
            return back()->withErrors(['leadset' => $result['message']])->withInput();
        }

        return back()->with('success', 'Leadset успешно создан');
    }

    /**
     * Импорт Leadset из файла
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimetypes:text/csv,text/plain,application/vnd.ms-excel,application/octet-stream'],
        ]);

        $result = $this->service->importFromFile($request->file('file'));

        if (! empty($result['errors'])) {
            return back()->withErrors(['file' => $result['errors']]);
        }

        return redirect()->route('leadsets.index')->with('success', 'Leadset успешно импортированы');
    }

    public function show(Leadset $leadset, Request $request)
    {
        
        return inertia('leadsets/leadset-show', [
            'leadset' => new LeadsetResource($leadset),
            
        ]);
    }
}
