<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationStoreRequest;
use App\Http\Resources\ApplicationResource;
use App\Services\Application\ApplicationService;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request, ApplicationService $service)
    {
        $applications = $service->getFiltered($request);

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

    public function store(ApplicationStoreRequest $request, ApplicationService $service)
    {
        $result = $service->createFromRequest($request);

        return back()->with($result['status'], $result['message']);
    }
}
