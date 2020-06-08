<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cases extends Model
{
    protected $table = 'cases';
    protected $fillable = [
        'name',
        'opening_balance',
        'current_balance',
        'created_at',
        'updated_at'
    ];
}
