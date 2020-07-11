<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\LoginHistory;

class LogSuccessfulLogin
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Login  $event
     * @return void
     */
    public function handle(Login $event)
    {
        //
        LoginHistory::create([
            'user_id'       =>  $event->user->id,
            'user_ip'       =>  \Illuminate\Support\Facades\Request::ip(),
            'create_date'   => Date('Y-m-d H:i:s')
        ]);
    }
}
