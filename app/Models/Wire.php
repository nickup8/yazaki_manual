<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wire extends Model
{
    protected $fillable = [
        'wire_key',
        'description',
        'cross_section',
        'wire_type_id',
        'wire_color_id_1',
        'wire_color_id_2',
        'wire_color_id_3',
        'wire_color_id_4',
    ];
}
