<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Controllers\Controller;
use App\Http\Resources\Profit as ProfitResource;
use Illuminate\Http\Request;
use DB;

class ProfitController extends Controller
{
    public function index()
    {
        exit;
    }

    public function show($date_from_to)
    {
        $date_range = explode(':', $date_from_to);
        $from = $date_range[0];
        $to = $date_range[1];
        
        $transactions = DB::table('transactions')
          ->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
          ->join('users', 'transactions.customer_code', '=', 'users.customer_code')
          ->selectRaw('currencies.id as id, count(currencies.id) as count, currencies.name as currency_name, sum(transactions.profit) as currency_profit')
          ->where('transactions.created_at', '>=', $from.' 00:00:00')
          ->where('transactions.created_at', '<=', $to.' 23:59:59')
          ->groupBy('currencies.id')
          ->get();

        return json_encode($transactions);
    }

    public function store(Request $request)
    {        
        exit;
    }

    public function update(Request $request, $id)
    {        
        exit;
    }

    public function destroy($id)
    {
        exit;
    }
}
