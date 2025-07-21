<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CrimpStandartController extends Controller
{
    public function index()
    {
        return inertia('crimp-standarts/crimp-standarts-index');
    }

    public function create()
    {
        return inertia('crimp-standarts/crimp-standarts-create');
    }
}
