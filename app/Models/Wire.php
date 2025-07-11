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

    public function wire_type() {
        return $this->belongsTo(WireType::class);
    }

   public function wire_color_base() {
        return $this->belongsTo(WireColor::class, 'wire_color_id_1', 'id');
    }

    public function wire_color_add() {
        return $this->belongsTo(WireColor::class, 'wire_color_id_2', 'id');
    }

    public function wire_color_add2() {
        return $this->belongsTo(WireColor::class, 'wire_color_id_3', 'id');
    }

    public function wire_color_add3() {
        return $this->belongsTo(WireColor::class, 'wire_color_id_4', 'id');
    }

}
