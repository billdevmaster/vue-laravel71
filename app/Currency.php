<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';
    protected $fillable = [
        'name',
        'code',
        'buy_code',
        'sell_code',
        'buy_rate_from',
        'buy_rate_to',
        'sell_rate_from',
        'sell_rate_to',
        'current_balance',
        'opening_balance',
        'opening_avg_rate',
        'last_avg_rate',
        'calc_type',
        'bs_amount_dec_limit',
        'avg_rate_dec_limit',
        'balance_dec_limit',
        'last_avg_rate_dec_limit',
        'flag_img'
    ];
}
