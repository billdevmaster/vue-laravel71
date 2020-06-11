<?php

namespace App\Http\Controllers\Api\V1;

use App\Cases;
use App\Http\Controllers\Controller;
use App\Http\Resources\Cases as CasesResource;
use Illuminate\Http\Request;

class CasesController extends Controller
{
    public function index()
    {
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
            'opening_balance' => 'required|numeric',
            'current_balance' => 'required|numeric'
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
