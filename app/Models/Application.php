<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'terminal_id',
        'inventory_key_application',
        'location',
    ];

    public function terminal()
    {
        return $this->belongsTo(Terminal::class);
    }
}
