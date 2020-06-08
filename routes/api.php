<?php

Route::group(['prefix' => '/v1', 'middleware' => ['auth:api'], 'namespace' => 'Api\V1', 'as' => 'api.'], function () {
    Route::post('change-password', 'ChangePasswordController@changePassword')->name('auth.change_password');
    Route::apiResource('roles', 'RolesController');
    Route::apiResource('users', 'UsersController');
    Route::apiResource('companies', 'CompaniesController');
    Route::apiResource('employees', 'EmployeesController');
    Route::apiResource('customers', 'CustomerController');
    Route::apiResource('cases', 'CasesController');
    Route::apiResource('currency', 'CurrencyController');
    Route::apiResource('transations', 'TransactionController');

});
