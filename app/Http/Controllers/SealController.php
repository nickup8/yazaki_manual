<?php

namespace App\Http\Controllers;

use App\Http\Requests\SealStoreRequest;
use App\Http\Resources\SealColorResource;
use App\Http\Resources\SealResource;
use App\Models\SealColor;
use App\Services\Seal\SealService;
use Illuminate\Http\Request;

class SealController extends Controller
{
    public function index(Request $request, SealService $service)
    {
        $seals = $service->getFiltered($request);

        return inertia('seals/seal-index', [
            'seals' => SealResource::collection($seals),
        ]);
    }

    public function create()
    {
        return inertia('seals/seal-create', [
            'seal_colors' => SealColorResource::collection(SealColor::all()),
            'success' => session('success'),
        ]);
    }

    public function store(SealStoreRequest $request, SealService $service)
    {
        $result = $service->createFromRequest($request);

        return back()->with($result['status'], $result['message']);
    }
}
