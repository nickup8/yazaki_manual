<?php

namespace App\Http\Controllers;

use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Http\Request;

class WireController extends Controller
{
    public function index() {
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        return inertia('wires/wire-index', [
            'wire_types' => $wire_types,
            'wire_colors' => $wire_colors
        ]);
    }
}
