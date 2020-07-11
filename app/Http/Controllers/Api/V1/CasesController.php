<?php

namespace App\Http\Controllers\Api\V1;

use App\Cases;
use App\Transaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Cases as CasesResource;
use Illuminate\Http\Request;
use DB;

class CasesController extends Controller
{
    public function index()
    {
        $case = Cases::with([])->first();

        $transactions = DB::table('transactions')
          ->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
          ->join('users', 'transactions.customer_code', '=', 'users.customer_code')
          ->select(     'transactions.id as id', 
                        'users.first_name as customer_first_name', 
                        'users.last_name as customer_last_name', 
                        'currencies.calc_type as calc_type', 
                        'transactions.created_at as created_at', 
                        'currencies.name as name', 
                        'transactions.amount as amount', 
                        'transactions.rate as rate', 
                        'transactions.total as total', 
                        'transactions.profit as profit', 
                        'transactions.type as type', 
                        'transactions.current_balance as current_balance', 
                        'transactions.last_avg_rate as last_avg_rate', 
                        'transactions.paid_by_client as paid_by_client', 
                        'transactions.return_to_client as return_to_client' )
          ->get();

        $current_total = $case->opening_balance;
        foreach ($transactions as $k => $c) {
            if (!$c->type) {
                switch ($c->calc_type) {
                    case 'Multiplication':
                        $current_total -= $c->amount * $c->rate + $c->profit;
                        break;
                    case 'Division':
                        $current_total -= $c->amount / $c->rate + $c->profit;
                        break;
                    case 'Special':
                        $current_total += $c->amount + $c->profit;
                        break;
                    
                    default:
                        # code...
                        break;
                }
            }
            else {                
                switch ($c->calc_type) {
                    case 'Multiplication':
                        $current_total += $c->amount * $c->rate + $c->profit;
                        break;
                    case 'Division':
                        $current_total += $c->amount / $c->rate + $c->profit;
                        break;
                    case 'Special':
                        $current_total -= $c->amount + $c->profit;
                        break;
                    
                    default:
                        # code...
                        break;
                }
            }
        }

        $user_balances = DB::table('users')
          ->select(     'users.balance as balance' )
          ->get();

        foreach ($user_balances as $key => $balance) {
            $current_total += $balance->balance;
        }
        $case_data = array(
            'current_balance'     => $current_total
        );
        $case->update($case_data);
        $case->touch();
        return new CasesResource(Cases::with([])->get());
    }

    public function show($id)
    {
        $cases = Cases::with([])->findOrFail($id);

        return new CasesResource($cases);
    }

    public function store(Request $request)
    {
        if(count(Cases::with([])->get()) > 0 )
            return response()->json(['hasCase'=>false,'errors'=>"One Case can be created only!!!"]);

        request()->validate([
            'name' => 'required|min:3|max:5',
            'opening_balance' => 'required|numeric'
        ]);

        $cases = Cases::create($request->all());

        return (new CasesResource($cases))
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
        
        $cases = Cases::findOrFail($id);
        $cases->update($request->all());
        $cases->touch();
        return (new CasesResource($cases))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $cases = Cases::findOrFail($id);
        $cases->delete();

        return response(null, 204);
    }
}
