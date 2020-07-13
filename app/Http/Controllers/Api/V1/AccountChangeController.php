<?php

namespace App\Http\Controllers\Api\V1;

use App\IncomeChange;
use App\PaymentChange;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class AccountChangeController extends Controller
{
    public function index()
    {

    }

    public function show($id)
    {
        if ($id == "income")        
            $income = DB::table('income_change')
            ->join('users', 'income_change.user_id', '=', 'users.id')
            ->join('users as u2', 'income_change.modify_by', '=', 'u2.id')
            ->join('product', 'income_change.product_id', '=', 'product.id')
            ->select(       'income_change.id as id', 
                            'income_change.serial_number as serial_number', 
                            'income_change.amount as amount', 
                            'income_change.note as note', 
                            'income_change.invoice_date as invoice_date', 
                            'income_change.modify_date as modify_date', 
                            'income_change.operation_type as operation_type', 
                            'u2.name as modify_by', 
                            'users.id as user_id', 
                            'users.name as user_name', 
                            'product.id as product_id', 
                            'product.name as product_name' )
            ->get();
        elseif ($id == "payment")
            $income = DB::table('payment_change')
            ->join('users', 'payment_change.user_id', '=', 'users.id')
            ->join('users as u2', 'payment_change.modify_by', '=', 'u2.id')
            ->join('product', 'payment_change.product_id', '=', 'product.id')
            ->select(       'payment_change.id as id', 
                            'payment_change.serial_number as serial_number', 
                            'payment_change.amount as amount', 
                            'payment_change.note as note', 
                            'payment_change.invoice_date as invoice_date', 
                            'payment_change.modify_date as modify_date', 
                            'payment_change.operation_type as operation_type', 
                            'payment_change.modify_by as modify_by', 
                            'u2.name as modify_by', 
                            'users.id as user_id', 
                            'users.name as user_name', 
                            'product.id as product_id', 
                            'product.name as product_name' )
            ->get();

        return json_encode($income);
    }

    public function store(Request $request)
    {
        
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {        
        if ($id == 'income') {
            IncomeChange::whereNotNull('id')->delete();
            
            return response(null, 204);
        }
        else {
            PaymentChange::whereNotNull('id')->delete();
            
            return response(null, 204);
        }
    }
}
