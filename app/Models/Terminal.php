<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Terminal extends Model
{
    protected $fillable = [
        'terminal_key',
        'description',
        'terminal_spn',
        'terminal_supplier',
    ];
}


