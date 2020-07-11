<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoginHistory as LoginHistoryResource;
use Illuminate\Http\Request;
use DB;


class LoginHistoryController extends Controller
{
    public function index()
    {
        $login_history = DB::table('login_history')
          ->join('users', 'login_history.user_id', '=', 'users.id')
          ->select(     'users.name as user_name', 
                        'login_history.id as id',
                        'login_history.user_ip as user_ip', 
                        'login_history.create_date as create_date' )
          ->get();

        return new LoginHistoryResource($login_history);
    }

    public function show($id)
    {
        
    }

    public function store(StoreRolesRequest $request)
    {
        
    }

    public function update(UpdateRolesRequest $request, $id)
    {
        
    }

    public function destroy($id)
    {
        
    }
}
