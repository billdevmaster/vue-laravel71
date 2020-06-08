<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'first_name', 
        'last_name', 
        'password',
        'email',
        'company_name',
        'mobile',
        'customer_code',
        'phone', 
        'fax', 
        'birthday', 
        'eco_ben',
        'address',
        'city',
        'country',
        'password',
        'name_id',
        'id_type',
        'id_number',
        'place_issue',
        'place_birthday',
        'national',
        'expire_date',
        'role_id',
        'id_img',
        'company_img',
        'mix_img'
    ];
}
