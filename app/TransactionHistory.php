<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    protected $table = 'transaction_history';
    protected $fillable = [
        'name',
        'customer_code',
        'currency_id',
        'amount',
        'rate',
        'total',
        'paid_by_client',
        'return_to_client',
        'description',
        'profit',
        'type',
        'last_avg_rate',
        'current_balance',
        'modified_user',
        'operation_type',
        'modified_date',
        'created_at',
        'updated_at'
    ];
}
