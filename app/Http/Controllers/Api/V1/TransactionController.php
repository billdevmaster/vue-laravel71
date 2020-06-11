<?php

namespace App\Http\Controllers\Api\V1;

use App\Transaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction as TransactionResource;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return new TransactionResource(Transaction::with([])->get());
    }

    public function show($id)
    {
        $transaction = Transaction::with([])->findOrFail($id);

        return new TransactionResource($transaction);
    }

    public function store(Request $request)
    {
        $current_balance = $request->current_balance + $request->amount;
        
        
        // return (new TransactionResource($transaction))
        //     ->response()
        //     ->setStatusCode(201);
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
