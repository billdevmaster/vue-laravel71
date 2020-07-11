<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    public $timestamps = false;
    protected $table = 'income';
    protected $fillable = [
        'serial_number',
        'user_id',
        'product_id',
        'amount',
        'note',
        'create_date'
    ];
}
