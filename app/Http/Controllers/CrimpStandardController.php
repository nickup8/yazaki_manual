<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrimpStandardStoreRequest;
use App\Http\Resources\CrimpStandardResource;
use App\Imports\CrimpStandardImport;
use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CrimpStandardController extends Controller
{
    public function index(Request $request)
{
    $query = CrimpStandard::query();

    // Фильтр по терминалу
    if ($request->filled('terminal')) {
        $terminal = Terminal::where('terminal_key', $request->input('terminal'))->first();
        if (!$terminal) {
            // Терминал не найден — вернуть пустую коллекцию
            return inertia('crimp-standards/crimp-standards-index', [
                'crimp_standards' => CrimpStandardResource::collection(collect()),
            ]);
        }
        $query->where('terminal_id', $terminal->id); 
    }

    // Фильтр по уплотнителю
    if ($request->filled('seal')) {
        $seal = Seal::where('seal_key', $request->input('seal'))->first();
        if (!$seal) {
            // Уплотнитель не найден — вернуть пустую коллекцию
            return inertia('crimp-standards/crimp-standards-index', [
                'crimp_standards' => CrimpStandardResource::collection(collect()),
            ]);
        }
        $query->where('seal_id', $seal->id);
    }

    // Загружаем только если есть фильтры или передан параметр all
    $crimpStandards = ($request->filled('terminal') || $request->filled('seal') || $request->filled('all'))
        ? $query->paginate(10)->withQueryString()
        : collect(); // пустая коллекция, если ничего не запрошено

    return inertia('crimp-standards/crimp-standards-index', [
        'crimp_standards' => CrimpStandardResource::collection($crimpStandards),
    ]);
}

    public function create()
    {
        $wire_types = WireType::all();

        return inertia('crimp-standards/crimp-standards-create',
            [
                'wire_types' => $wire_types,
                'success' => session('success'),
            ]);
    }

    public function store(CrimpStandardStoreRequest $request)
{
    $data = $request->validated();

    /** @var \App\Models\Terminal|null $terminal */
    $terminal = Terminal::where('terminal_key', $data['terminal'])->first();
    if (! $terminal) {
        return back()->withErrors(['terminal' => 'Терминал не найден.']);
    }

    /** @var \App\Models\Seal|null $seal */
    $seal = null;
    if (! empty($data['seal'])) {
        $seal = Seal::where('seal_key', $data['seal'])->first();
        if (! $seal) {
            return back()->withErrors(['seal' => 'Уплотнитель не найден.']);
        }
    }

    // Проверка существования типа провода 1 (обязателен)
    if (! WireType::where('id', $data['wire_type_id_1'])->exists()) {
        return back()->withErrors(['wire_type_id_1' => 'Тип провода 1 не найден.']);
    }

    // Проверка типа провода 2 (если указан)
    if (! empty($data['wire_type_id_2']) && ! WireType::where('id', $data['wire_type_id_2'])->exists()) {
        return back()->withErrors(['wire_type_id_2' => 'Тип провода 2 не найден.']);
    }

    /** @var \App\Models\CrimpStandard $crimpStandard */
    $crimpStandard = CrimpStandard::create([
        ...$request->safe()->except(['terminal', 'seal']),
        'terminal_id' => $terminal->id,
        'seal_id' => $seal?->id,
    ]);

    return back()->with('success', 'Кримп-стандарт ' . $terminal->terminal_key . ' успешно создан');
}


    public function show(CrimpStandard $crimpStandard)
    {
        return inertia('crimp-standards/crimp-standards-show', [
            'crimp_standards' => new CrimpStandardResource($crimpStandard),
        ]);
    }

    public function edit(CrimpStandard $crimpStandard)
    {
        $wire_types = WireType::all();

        return inertia('crimp-standards/crimp-standards-update', [
            'crimp_standards' => new CrimpStandardResource($crimpStandard),
            'wire_types' => $wire_types,
        ]);
    }

    public function update(CrimpStandard $crimpStandard)
    {
        $crimpStandard->update(request()->all());

        return redirect()->route('crimp_standards.show', $crimpStandard)->with('success', 'Кримп-стандарт успешно обновлен');
    }

    public function destroy(CrimpStandard $crimpStandard)
    {
        $crimpStandard->delete();

        return redirect()->route('crimp_standards.index')->with('success', 'Кримп-стандарт успешно удален');
    }

    public function import(Request $request)
{
    $request->validate([
        'file' => ['required', 'file', 'mimes:csv,txt'],
    ]);

    Excel::import(new CrimpStandardImport, $request->file('file'));

    return back()->with('success', 'Импорт завершён');
}
}
