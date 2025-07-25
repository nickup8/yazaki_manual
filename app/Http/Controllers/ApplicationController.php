<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationStoreRequest;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use App\Models\Terminal;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::query();
        if($request->filled('terminal')) {
            $terminal = Terminal::where('terminal_key', $request->input('terminal'))->first();
            if (!$terminal) {
                // Терминал не найден — вернуть пустую коллекцию
                return inertia('applications/application-index', [
                    'applications' => ApplicationResource::collection(collect(['12'])),
                ]);
            }
            $query->where('terminal_id', $terminal->id);
        }
        
        if($request->filled('application')) {
            $query->where('inventory_key_application', $request->input('application'));
        }
        
        $applications = ($request->filled('terminal') || $request->filled('application') || $request->filled('all')) ? $query->paginate(10)->withQueryString() : collect();

        return inertia('applications/application-index', [
            'applications' => ApplicationResource::collection($applications),
        ]);
    }

    public function create()
    {
        return inertia('applications/application-create', [
            'success' => session('success'),
        ]);
    }

    public function store(ApplicationStoreRequest $request)
{
    $data = $request->validated();

    $terminal = Terminal::where('terminal_key', $data['terminal'])->first();
    if (! $terminal) {
        return back()->withErrors(['terminal' => 'Терминал не найден.']);
    }

    try {
        Application::create([
            'terminal_id' => $terminal->id,
            'inventory_key_application' => $data['inventory_key'],
            'location' => $data['location'],
        ]);
    } catch (\Illuminate\Database\QueryException $e) {
        if ($e->getCode() === '23000') { // SQLSTATE[23000]: Integrity constraint violation
            return back()->withErrors([
                'general' => 'Аппликатор уже существует.',
            ]);
        }

        throw $e; // пробросить остальные ошибки дальше
    }

    return back()->with('success', 'Аппликатор успешно создан');
}
}
