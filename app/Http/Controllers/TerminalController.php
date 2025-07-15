<?php

namespace App\Http\Controllers;

use App\Http\Requests\TerminalStoreRequest;
use App\Http\Resources\TerminalResource;
use App\Imports\TerminalsImport;
use App\Models\Terminal;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TerminalController extends Controller
{
    public function index(Request $request)
    {
        $hasFilters = $request->filled('terminal_key');
        $shouldLoadData = $hasFilters || $request->boolean('all');

        $terminals = [];

        if ($shouldLoadData) {
            $query = Terminal::query();

            if ($hasFilters) {
                $query->where('terminal_key', $request->input('terminal_key'));
            }

            $terminals = $query->paginate(10)->appends($request->all());
        }

        return inertia('terminals/terminal-index', [
            'terminals' => TerminalResource::collection($terminals),
            'filters' => [
                'terminal_key' => $request->input('terminal_key'),
                'all' => $request->input('all'),
            ],
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
        $data = $request->validated();

        $terminalRequest = Terminal::where('terminal_key', $data['terminal_key'])->first();

        if ($terminalRequest) {
            return redirect()->route('terminals.create')
                ->withErrors(['terminal_key' => 'Такой код уже существует.'])
                ->withInput();
        }

        $terminal = Terminal::create([
            'terminal_key' => $data['terminal_key'],
            'terminal_spn' => $data['terminal_spn'],
            'terminal_supplier' => $data['terminal_supplier'],
            'description' => $data['description'],
        ]);

        return back()->with('success', 'Терминал '.$terminal->terminal_key.' успешно создан');
    }

    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:csv,txt,xlsx',
    ]);

    $import = new TerminalsImport();
    Excel::import($import, $request->file('file'));

    return back()->with([
        'successCount' => $import->successCount,
        'skippedCount' => $import->skippedCount,
        'importErrors' => $import->errors,
    ]);
}
}
