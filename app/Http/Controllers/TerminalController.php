<?php

namespace App\Http\Controllers;

use App\Http\Requests\TerminalStoreRequest;
use App\Models\Terminal;
use Illuminate\Http\Request;

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
            'terminals' => $terminals,
            'filters' => [
                'terminal_key' => $request->input('terminal_key'),
                'all' => $request->input('all'),
            ],
        ]);
    }

    public function create() {
        return inertia('terminals/terminal-create', [
            'success'=> session('success')
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

        return back()->with('success', 'Терминал ' . $terminal->terminal_key . ' успешно создан');
    }
}
