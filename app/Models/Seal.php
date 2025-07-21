<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seal extends Model
{
    protected $fillable = [
        'seal_key',
        'seal_spn',
        'seal_supplier',
        'description',
        'seal_color_id',
    ];

    public function seal_color()
    {
        return $this->belongsTo(SealColor::class);
    }
}
