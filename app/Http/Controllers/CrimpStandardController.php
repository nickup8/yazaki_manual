<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrimpStandardStoreRequest;
use App\Http\Resources\CrimpStandardResource;
use App\Models\CrimpStandard;
use App\Models\WireType;
use App\Services\CrimpStandard\CrimpStandardImporter;
use App\Services\CrimpStandard\CrimpStandardService;
use Illuminate\Http\Request;

class CrimpStandardController extends Controller
{
    public function index(Request $request, CrimpStandardService $service)
    {
        $standards = $service->getFiltered($request);

        return inertia('crimp-standards/crimp-standards-index', [
            'crimp_standards' => CrimpStandardResource::collection($standards),
        ]);
    }

    public function create()
    {
        return inertia('crimp-standards/crimp-standards-create', [
            'wire_types' => WireType::all(),
            'success' => session('success'),
        ]);
    }

    public function store(CrimpStandardStoreRequest $request, CrimpStandardService $service)
    {
        $result = $service->createFromRequest($request);

        return back()->with($result['status'], $result['message']);
    }

    public function show(CrimpStandard $crimpStandard)
    {
        return inertia('crimp-standards/crimp-standards-show', [
            'crimp_standards' => new CrimpStandardResource($crimpStandard),
        ]);
    }

    public function edit(CrimpStandard $crimpStandard)
    {
        return inertia('crimp-standards/crimp-standards-update', [
            'crimp_standards' => new CrimpStandardResource($crimpStandard),
            'wire_types' => WireType::all(),
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

    public function import(Request $request, CrimpStandardImporter $importer)
    {
        $request->validate(['file' => ['required', 'file', 'mimes:csv,txt']]);

        $importer->import($request->file('file'));

        return back()->with('success', 'Импорт завершён');
    }
}
