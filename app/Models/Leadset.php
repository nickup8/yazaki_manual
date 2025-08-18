<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leadset extends Model
{
    protected $fillable = [
        'leadset', 'prod_version', 'description', 'vendor_code',
        'cable_class', 'batch_size', 'plan_time_batch'
    ];

    public function wires()
    {
        return $this->belongsToMany(Wire::class, 'leadset_wires');
    }

    public function terminals()
    {
        return $this->belongsToMany(Terminal::class, 'leadset_terminals')
                    ->withPivot(['stripping_length', 'part_strip_length', 'note'])
                    ->withTimestamps();
    }

    public function seals()
    {
        return $this->belongsToMany(Seal::class, 'leadset_seals');
    }
}
