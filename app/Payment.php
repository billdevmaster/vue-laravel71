<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    public $timestamps = false;
    protected $table = 'payment';
    protected $fillable = [
        'serial_number',
        'user_id',
        'product_id',
        'amount',
        'note',
        'create_date'
    ];
}
