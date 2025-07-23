<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrimpStandard extends Model
{
    protected $fillable = [
        'terminal_id',
        'seal_id',
        'type_code_wire_1',
        'size_code_wire_1',
        'type_code_wire_2',
        'size_code_wire_2',
        'wire_type_id_1',
        'cross_section_wire_1',
        'wire_type_id_2',
        'cross_section_wire_2',
        'strip_length',
        'str_tolerance',
        'conductor_crimp_height',
        'conductor_crimp_height_tolerance',
        'isolation_crimp_height',
        'isolation_crimp_height_tolerance',
        'conductor_crimp_width_min',
        'conductor_crimp_width_max',
        'isolation_crimp_width_min',
        'isolation_crimp_width_max',
        'separation_force_wire_1',
        'separation_force_wire_2',
        'customer_code',
        'placement',
    ];

    public function terminal()
    {
        return $this->belongsTo(Terminal::class);
    }

    public function seal()
    {
        return $this->belongsTo(Seal::class);
    }

    public function wireType()
    {
        return $this->belongsTo(WireType::class, 'wire_type_id_1', 'id');
    }

    public function wireType2()
    {
        return $this->belongsTo(WireType::class, 'wire_type_id_2', 'id');
    }
}
