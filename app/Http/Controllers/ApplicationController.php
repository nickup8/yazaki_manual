<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationStoreRequest;
use App\Http\Resources\ApplicationResource;
use App\Services\Application\ApplicationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ApplicationController extends Controller
{
    private ApplicationService $service;

    public function __construct(ApplicationService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): Response
    {
        $applications = $this->service->getFiltered($request);

        return inertia('applications/application-index', [
            'applications' => ApplicationResource::collection($applications),
            'success' => session('success'),
            'errors' => session('errors'),
            'queryParams' => $request->all(),
        ]);
    }

    public function create(): Response
    {
        return inertia('applications/application-create', [
            'success' => session('success'),
        ]);
    }

    public function store(ApplicationStoreRequest $request): RedirectResponse
    {
        $result = $this->service->createFromRequest($request);

        return back()->with($result['status'], $result['message']);
    }
}
