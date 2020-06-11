<?php

namespace App\Http\Controllers\Api\V1;

use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\Currency as CurrencyResource;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function index()
    {
        return new CurrencyResource(Currency::with([])->get());
    }

    public function show($id)
    {
        $currency = Currency::with([])->findOrFail($id);

        return new CurrencyResource($currency);
    }

    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required|max:255',
            'code' => 'required|min:3|max:5',
            'buy_code' => 'required|max:255',
            'sell_code' => 'required|max:255',
            'buy_rate_from' => 'required|numeric',
            'buy_rate_to' => 'required|numeric',
            'sell_rate_from' => 'required|numeric',
            'sell_rate_to' => 'required|numeric',
            'current_balance' => 'required|numeric',
            'opening_balance' => 'required|numeric',
            'opening_avg_rate' => 'required|numeric',
            'last_avg_rate' => 'required|numeric',
            'calc_type' => 'required',
            'bs_amount_dec_limit' => 'required|numeric|max:5',
            'avg_rate_dec_limit' => 'required|numeric|max:5',
            'balance_dec_limit' => 'required|numeric|max:5',
            'last_avg_rate_dec_limit' => 'required|numeric|max:5',
            'flag_img' => 'required|image|max:2048',
        ]);

        $flag_img = $request->file('flag_img');
        $flag_img_new_name = rand() . '.' . $flag_img->getClientOriginalExtension();
        $flag_img->move(public_path('images/flag'), $flag_img_new_name);
        
        $form_data = array(
            'name' => $request->get('name'),
            'code' => $request->get('code'),
            'buy_code' => $request->get('buy_code'),
            'sell_code' => $request->get('sell_code'),
            'buy_rate_from' => $request->get('buy_rate_from'),
            'buy_rate_to' => $request->get('buy_rate_to'),
            'sell_rate_from' => $request->get('sell_rate_from'),
            'sell_rate_to' => $request->get('sell_rate_to'),
            'current_balance' => $request->get('current_balance'),
            'opening_balance' => $request->get('opening_balance'),
            'opening_avg_rate' => $request->get('opening_avg_rate'),
            'last_avg_rate' => $request->get('last_avg_rate'),
            'calc_type' => $request->get('calc_type'),
            'bs_amount_dec_limit' => $request->get('bs_amount_dec_limit'),
            'avg_rate_dec_limit' => $request->get('avg_rate_dec_limit'),
            'balance_dec_limit' => $request->get('balance_dec_limit'),
            'last_avg_rate_dec_limit' => $request->get('last_avg_rate_dec_limit'),
            'flag_img' => $flag_img_new_name
          );

        $currency = Currency::create($form_data);
        
        return (new CurrencyResource($currency))
        ->response()
        ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {        
        $currency = Currency::findOrFail($id);

        $flag_img_new_name = $currency->flag_img; 

        $flag_img = $request->file('flag_img');

        if($flag_img != "")
        {
            request()->validate([
                'name' => 'required|max:255',
                'code' => 'required|min:3|max:5',
                'buy_code' => 'required|max:255',
                'sell_code' => 'required|max:255',
                'buy_rate_from' => 'required|numeric',
                'buy_rate_to' => 'required|numeric',
                'sell_rate_from' => 'required|numeric',
                'sell_rate_to' => 'required|numeric',
                'current_balance' => 'required|numeric',
                'opening_balance' => 'required|numeric',
                'opening_avg_rate' => 'required|numeric',
                'last_avg_rate' => 'required|numeric',
                'calc_type' => 'required',
                'bs_amount_dec_limit' => 'required|numeric|max:5',
                'avg_rate_dec_limit' => 'required|numeric|max:5',
                'balance_dec_limit' => 'required|numeric|max:5',
                'last_avg_rate_dec_limit' => 'required|numeric|max:5',
                'flag_img' => 'required|image|max:2048',
            ]);

            $flag_img_new_name = rand() . '.' . $flag_img->getClientOriginalExtension();
            $flag_img->move(public_path('images/flag'), $flag_img_new_name);
        }else {
            request()->validate([
                'name' => 'required|max:255',
                'code' => 'required|min:3|max:5',
                'buy_code' => 'required|max:255',
                'sell_code' => 'required|max:255',
                'buy_rate_from' => 'required|numeric',
                'buy_rate_to' => 'required|numeric',
                'sell_rate_from' => 'required|numeric',
                'sell_rate_to' => 'required|numeric',
                'current_balance' => 'required|numeric',
                'opening_balance' => 'required|numeric',
                'opening_avg_rate' => 'required|numeric',
                'last_avg_rate' => 'required|numeric',
                'calc_type' => 'required',
                'bs_amount_dec_limit' => 'required|numeric|max:5',
                'avg_rate_dec_limit' => 'required|numeric|max:5',
                'balance_dec_limit' => 'required|numeric|max:5',
                'last_avg_rate_dec_limit' => 'required|numeric|max:5',
            ]);
        }

        $form_data = Array(
            'name' => $request->get('name'),
            'code' => $request->get('code'),
            'buy_code' => $request->get('buy_code'),
            'sell_code' => $request->get('sell_code'),
            'buy_rate_from' => $request->get('buy_rate_from'),
            'buy_rate_to' => $request->get('buy_rate_to'),
            'sell_rate_from' => $request->get('sell_rate_from'),
            'sell_rate_to' => $request->get('sell_rate_to'),
            'current_balance' => $request->get('current_balance'),
            'opening_balance' => $request->get('opening_balance'),
            'opening_avg_rate' => $request->get('opening_avg_rate'),
            'last_avg_rate' => $request->get('last_avg_rate'),
            'calc_type' => $request->get('calc_type'),
            'bs_amount_dec_limit' => $request->get('bs_amount_dec_limit'),
            'avg_rate_dec_limit' => $request->get('avg_rate_dec_limit'),
            'balance_dec_limit' => $request->get('balance_dec_limit'),
            'last_avg_rate_dec_limit' => $request->get('last_avg_rate_dec_limit'),
            'flag_img' => $flag_img_new_name
          );
          
        $currency->update($form_data);

        return (new CurrencyResource($currency))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $currency = Currency::findOrFail($id);
        $currency->delete();

        return response(null, 204);
    }
}
