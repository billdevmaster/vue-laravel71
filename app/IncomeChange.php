<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncomeChange extends Model
{
    public $timestamps = false;
    protected $table = 'income_change';
    protected $fillable = [
        'serial_number',
        'invoice_date',
        'user_id',
        'product_id',
        'amount',
        'note',
        'modify_date',
        'operation_type',
        'modify_by'
    ];
}
