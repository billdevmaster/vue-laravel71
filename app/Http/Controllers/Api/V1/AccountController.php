<?php

namespace App\Http\Controllers\Api\V1;

use App\Income;
use App\Payment;
use App\IncomeChange;
use App\PaymentChange;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Income as IncomeResource;
use App\Http\Resources\Payment as PaymentResource;
use Illuminate\Http\Request;
use DB;



class AccountController extends Controller
{
    public function index()
    {
        return new IncomeResource(Income::with([])->get());
    }

    public function show($id)
    {
        if ($id == "income")        
            $income = DB::table('income')
            ->join('users', 'income.user_id', '=', 'users.id')
            ->join('product', 'income.product_id', '=', 'product.id')
            ->select(       'income.id as id', 
                            'income.serial_number as serial_number', 
                            'income.amount as amount', 
                            'income.note as note', 
                            'income.create_date as create_date', 
                            'users.id as user_id', 
                            'users.name as user_name', 
                            'product.id as product_id', 
                            'product.name as product_name' )
            ->get();
        elseif ($id == "payment")
            $income = DB::table('payment')
            ->join('users', 'payment.user_id', '=', 'users.id')
            ->join('product', 'payment.product_id', '=', 'product.id')
            ->select(       'payment.id as id', 
                            'payment.serial_number as serial_number', 
                            'payment.amount as amount', 
                            'payment.note as note', 
                            'payment.create_date as create_date', 
                            'users.id as user_id', 
                            'users.name as user_name', 
                            'product.id as product_id', 
                            'product.name as product_name' )
            ->get();
        elseif ($id == "history")
        {            
            $user = auth()->user();
            if ($user->role->id == 1)
            {
                $payment = DB::table('payment')
                ->join('users', 'payment.user_id', '=', 'users.id')
                ->join('product', 'payment.product_id', '=', 'product.id')
                ->select(       'payment.id as id', 
                                'payment.serial_number as serial_number', 
                                'payment.amount as amount', 
                                'payment.note as note', 
                                'payment.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->selectRaw(    '"payment" as type');

                $income = DB::table('income')
                ->join('users', 'income.user_id', '=', 'users.id')
                ->join('product', 'income.product_id', '=', 'product.id')
                ->select(       'income.id as id', 
                                'income.serial_number as serial_number', 
                                'income.amount as amount', 
                                'income.note as note', 
                                'income.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->selectRaw(    '"income" as type')
                ->union($payment)
                ->get();
            }
            else {
                $payment = DB::table('payment')
                ->join('users', 'payment.user_id', '=', 'users.id')
                ->join('product', 'payment.product_id', '=', 'product.id')
                ->select(       'payment.id as id', 
                                'payment.serial_number as serial_number', 
                                'payment.amount as amount', 
                                'payment.note as note', 
                                'payment.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'users.balance as total_balance', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->selectRaw(    '"payment" as type')
                ->where('users.id', '=', $user->id);

                $income = DB::table('income')
                ->join('users', 'income.user_id', '=', 'users.id')
                ->join('product', 'income.product_id', '=', 'product.id')
                ->select(       'income.id as id', 
                                'income.serial_number as serial_number', 
                                'income.amount as amount', 
                                'income.note as note', 
                                'income.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'users.balance as total_balance', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->selectRaw(    '"income" as type')
                ->where('users.id', '=', $user->id)
                ->union($payment)
                ->get();
            }

        }
        else
        {
            $params = explode('-', $id);
            
            if ($params[1] == "Income")             
                $income = DB::table('income')
                ->join('users', 'income.user_id', '=', 'users.id')
                ->join('product', 'income.product_id', '=', 'product.id')
                ->select(       'income.id as id', 
                                'income.serial_number as serial_number', 
                                'income.amount as amount', 
                                'income.note as note', 
                                'income.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->where('income.id', '=', $params[0])
                ->get();
            else
                $income = DB::table('payment')
                ->join('users', 'payment.user_id', '=', 'users.id')
                ->join('product', 'payment.product_id', '=', 'product.id')
                ->select(       'payment.id as id', 
                                'payment.serial_number as serial_number', 
                                'payment.amount as amount', 
                                'payment.note as note', 
                                'payment.create_date as create_date', 
                                'users.id as user_id', 
                                'users.name as user_name', 
                                'product.id as product_id', 
                                'product.name as product_name' )
                ->where('payment.id', '=', $params[0])
                ->get();
        }

        return json_encode($income);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $account_data = $request->all();

        $user = User::findOrFail($account_data['user']['id']);

        if ($account_data['type'] == "income") 
        {
            $account = Income::create(
                                array(
                                    'serial_number' => $account_data['serial_number'],
                                    'user_id' => $account_data['user']['id'],
                                    'product_id' => $account_data['product']['id'],
                                    'amount' => $account_data['amount'],
                                    'note' => $account_data['note'],
                                    'create_date' => $account_data['create_date'],
                                )
                            );
            IncomeChange::create(
                            array(
                                'serial_number'     => $account_data['serial_number'],
                                'invoice_date'      => $account_data['create_date'],
                                'user_id'           => $account_data['user']['id'],
                                'product_id'        => $account_data['product']['id'],
                                'amount'            => $account_data['amount'],
                                'note'              => $account_data['note'],
                                'modify_date'       => Date('Y-m-d'),
                                'operation_type'    => 'Create',
                                'modify_by'         => $user->id,
                            )
                        );
            $new_balance = $user->balance + $account_data['amount'];
            $user->balance = $new_balance;
            $user->save();
            
        }
        else
        {
            $account = Payment::create(
                                array(
                                    'serial_number' => $account_data['serial_number'],
                                    'user_id' => $account_data['user']['id'],
                                    'product_id' => $account_data['product']['id'],
                                    'amount' => $account_data['amount'],
                                    'note' => $account_data['note'],
                                    'create_date' => $account_data['create_date'],
                                )
                            );
            PaymentChange::create(
                            array(
                                'serial_number'     => $account_data['serial_number'],
                                'invoice_date'      => $account_data['create_date'],
                                'user_id'           => $account_data['user']['id'],
                                'product_id'        => $account_data['product']['id'],
                                'amount'            => $account_data['amount'],
                                'note'              => $account_data['note'],
                                'modify_date'       => Date('Y-m-d'),
                                'operation_type'    => 'Create',
                                'modify_by'         => $user->id,
                            )
                        );
            $new_balance = $user->balance - $account_data['amount'];
            $user->balance = $new_balance;
            $user->save();
        }

        return (new IncomeResource($account))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {        
        $account_data = $request->all();       
        
        $user = User::findOrFail($account_data['user']['id']);
        
        if ($account_data['type'] == "income") 
            $income = Income::findOrFail($id);
        else
            $income = Payment::findOrFail($id);

        $current_user = auth()->user();

        if ($account_data['type'] == "income") 
        {
            IncomeChange::create(
                            array(
                                'serial_number'     => $account_data['serial_number'],
                                'invoice_date'      => $account_data['create_date'],
                                'user_id'           => $account_data['user']['id'],
                                'product_id'        => $account_data['product']['id'],
                                'amount'            => $account_data['amount'],
                                'note'              => $account_data['note'],
                                'modify_date'       => Date('Y-m-d H:i:s'),
                                'operation_type'    => 'Edit',
                                'modify_by'         => $current_user->id,
                            )
                        );
            $new_balance = $user->balance - $income->amount + $account_data['amount'];
            $user->balance = $new_balance;
            $user->save();
        }
        else
        {
            PaymentChange::create(
                            array(
                                'serial_number'     => $account_data['serial_number'],
                                'invoice_date'      => $account_data['create_date'],
                                'user_id'           => $account_data['user']['id'],
                                'product_id'        => $account_data['product']['id'],
                                'amount'            => $account_data['amount'],
                                'note'              => $account_data['note'],
                                'modify_date'       => Date('Y-m-d H:i:s'),
                                'operation_type'    => 'Edit',
                                'modify_by'         => $current_user->id,
                            )
                        );
            $new_balance = $user->balance + $income->amount - $account_data['amount'];
            $user->balance = $new_balance;
            $user->save();
        }
        $income->update(
                            array(
                                'serial_number' => $account_data['serial_number'],
                                'user_id' => $account_data['user']['id'],
                                'product_id' => $account_data['product']['id'],
                                'amount' => $account_data['amount'],
                                'note' => $account_data['note'],
                                'create_date' => $account_data['create_date'],
                            )
                        );

        return (new IncomeResource($income))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $params = explode('-', $id);
        
        if ($params[1] == "Income")   
            $income = Income::findOrFail($params[0]);
        else
            $income = Payment::findOrFail($params[0]);
        
        $user = User::findOrFail($income['user_id']);

        $current_user = auth()->user();

        if ($params[1] == "Income") 
        {
            IncomeChange::create(
                            array(
                                'serial_number'     => $income['serial_number'],
                                'invoice_date'      => $income['create_date'],
                                'user_id'           => $income['user_id'],
                                'product_id'        => $income['product_id'],
                                'amount'            => $income['amount'],
                                'note'              => $income['note'],
                                'modify_date'       => Date('Y-m-d H:i:s'),
                                'operation_type'    => 'Delete',
                                'modify_by'         => $current_user->id,
                            )
                        );
            
            $new_balance = $user->balance - $income['amount'];
            $user->balance = $new_balance;
            $user->save();
        }
        else
        {
            PaymentChange::create(
                            array(
                                'serial_number'     => $income['serial_number'],
                                'invoice_date'      => $income['create_date'],
                                'user_id'           => $income['user_id'],
                                'product_id'        => $income['product_id'],
                                'amount'            => $income['amount'],
                                'note'              => $income['note'],
                                'modify_date'       => Date('Y-m-d H:i:s'),
                                'operation_type'    => 'Delete',
                                'modify_by'         => $current_user->id,
                            )
                        );
            
            $new_balance = $user->balance + $income['amount'];
            $user->balance = $new_balance;
            $user->save();
        }

        $income->delete();

        return response(null, 204);
    }
}
