<?php

namespace App\Http\Controllers\Api\V1;

use App\Transaction;
use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction as TransactionResource;
use Illuminate\Http\Request;
use DB;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = DB::table('transactions')
          ->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
          ->select(     'transactions.id as id', 
                        'currencies.calc_type as calc_type', 
                        'transactions.created_at as created_at', 
                        'currencies.name as name', 
                        'transactions.amount as amount', 
                        'transactions.rate as rate', 
                        'transactions.total as total', 
                        'transactions.profit as profit', 
                        'transactions.current_balance as current_balance', 
                        'transactions.last_avg_rate as last_avg_rate', 
                        'transactions.paid_by_client as paid_by_client', 
                        'transactions.return_to_client as return_to_client' )
          ->get();

        return json_encode($transactions);
    }

    public function show($id)
    {
        $transaction = Transaction::with([])->findOrFail($id);

        return new TransactionResource($transaction);
    }

    public function store(Request $request)
    {
        $profit = 0;
        if ($request->type == 0) 
            $new_current_balance = $request->current_balance + $request->amount;
        else
            $new_current_balance = $request->current_balance - $request->amount;

        switch ($request->calc_type) {
            case 'Multiplication':
                if ($request->type == 0) 
                    $new_currency_avg_rate = ((($request->current_balance * $request->last_avg_rate) + ($request->amount * $request->rate)) / ($new_current_balance));
                else
                {
                    $new_currency_avg_rate = ((($request->current_balance * $request->last_avg_rate) - ($request->amount * $request->last_avg_rate)) / ($new_current_balance));
                    $profit = ($request->amount * $request->rate) - ($request->amount * $request->last_avg_rate);
                }
                break;
            case 'Division':                
                if ($request->type == 0) 
                    $new_currency_avg_rate = (($new_current_balance) / (($request->current_balance / $request->last_avg_rate) + ($request->amount / $request->rate)));
                else
                {
                    $new_currency_avg_rate = (($new_current_balance) / (($request->current_balance / $request->last_avg_rate) - ($request->amount / $request->last_avg_rate)));
                    $profit = ($request->amount / $request->rate) - ($request->amount / $request->last_avg_rate);
                }
                break;
            case 'Special':
                if ($request->type == 0) 
                    $new_currency_avg_rate = (($new_current_balance) / (($request->current_balance / $request->last_avg_rate) + ($request->amount / $request->rate)));
                else
                {
                    $new_currency_avg_rate = (($new_current_balance) / (($request->current_balance / $request->last_avg_rate) - ($request->amount / $request->last_avg_rate)));
                    $profit = ($request->amount / $request->rate) - ($request->amount / $request->last_avg_rate);
                }
                break;
            
            default:
                # code...
                break;
        }

        $transaction_data = array(            
            'name'              => $request->name,
            'customer_id'       => $request->customer_id,
            'currency_id'       => $request->currency_id,
            'amount'            => $request->amount,
            'rate'              => $request->rate,
            'total'             => $request->amount * $request->rate,
            'paid_by_client'    => $request->paid_by_client,
            'return_to_client'  => $request->return_to_client,
            'description'       => $request->description,
            'profit'            => $profit,
            'type'              => $request->type,
            'last_avg_rate'     => $new_currency_avg_rate,
            'current_balance'   => $new_current_balance
        );
        
        $transactions = Transaction::create($transaction_data);        

        $currency = Currency::findOrFail($request->currency_id);
        
        $currency_data = Array(
            'current_balance' => $new_current_balance,
            'last_avg_rate' => $new_currency_avg_rate
          );
        
        $currency->update($currency_data);

        return (new TransactionResource($transactions))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        request()->validate([
            'name' => 'required|min:3|max:5',
            'opening_balance' => 'required|numeric',
            'current_balance' => 'required|numeric'
        ]);
        
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());
        $transaction->touch();
        return (new TransactionResource($transaction))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return response(null, 204);
    }
}
