<?php

namespace App\Http\Controllers;

use App\Http\Requests\TerminalStoreRequest;
use App\Http\Resources\TerminalResource;

use App\Services\Terminal\TerminalService;
use Illuminate\Http\Request;

class TerminalController extends Controller
{
    public function __construct(
        protected TerminalService $terminalService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only(['terminal_key', 'terminal_spn', 'all']);

        $terminals = null;

        $terminals = $this->terminalService->getFilteredPaginatedList($filters);

        return inertia('terminals/terminal-index', [
            'terminals' => TerminalResource::collection($terminals),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return inertia('terminals/terminal-create', [
            'success' => session('success'),
        ]);
    }

    public function store(TerminalStoreRequest $request)
    {
        $result = $this->terminalService->create($request->validated());

        if (! $result['success']) {
            return redirect()->route('terminals.create')
                ->withErrors(['terminal_key' => 'Такой код уже существует.'])
                ->withInput();
        }

        return back()->with('success', 'Терминал '.$result['terminal']->terminal_key.' успешно создан');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt,xlsx',
        ]);

        $result = $this->terminalService->importFromFile($request->file('file'));

        return back()->with($result);
    }
}
