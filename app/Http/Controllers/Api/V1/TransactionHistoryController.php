<?php

namespace App\Http\Controllers\Api\V1;

use App\TransactionHistory;
use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction as TransactionResource;
use Illuminate\Http\Request;
use DB;

class TransactionHistoryController extends Controller
{
    public function index()
    {
        $transaction_history = DB::table('transaction_history')
          ->join('currencies', 'transaction_history.currency_id', '=', 'currencies.id')
          ->join('users', 'transaction_history.customer_code', '=', 'users.customer_code')
          ->select(     'transaction_history.id as id', 
                        'users.first_name as customer_first_name', 
                        'users.last_name as customer_last_name', 
                        'currencies.id as currency_id', 
                        'currencies.name as name', 
                        'currencies.calc_type as calc_type', 
                        'currencies.bs_amount_dec_limit as bs_amount_dec_limit', 
                        'currencies.avg_rate_dec_limit as avg_rate_dec_limit', 
                        'currencies.balance_dec_limit as balance_dec_limit', 
                        'currencies.last_avg_rate_dec_limit as last_avg_rate_dec_limit', 
                        'transaction_history.created_at as created_at', 
                        'transaction_history.amount as amount', 
                        'transaction_history.rate as rate', 
                        'transaction_history.total as total', 
                        'transaction_history.profit as profit', 
                        'transaction_history.type as type', 
                        'transaction_history.current_balance as current_balance', 
                        'transaction_history.customer_code as customer_code', 
                        'transaction_history.last_avg_rate as last_avg_rate', 
                        'transaction_history.paid_by_client as paid_by_client', 
                        'transaction_history.return_to_client as return_to_client', 
                        'transaction_history.modified_user as modified_user', 
                        'transaction_history.modified_date as modified_date', 
                        'transaction_history.operation_type as operation_type' )
          ->get();

        return json_encode($transaction_history);
    }

    public function show($id)
    {           

    }

    public function store(Request $request)
    {
        
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {        
        TransactionHistory::whereNotNull('id')->delete();
        
        return response(null, 204);
    }
}
