<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LoginHistory extends Model
{
    public $timestamps = false;
    protected $table = 'login_history';
    protected $fillable = [
        'user_id',
        'user_ip',
        'create_date'
    ];
}
