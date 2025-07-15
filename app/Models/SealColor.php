<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SealColor extends Model
{
    protected $fillable = [
        'color_name',
        'color_hex',
        'color_short',
    ];
}
