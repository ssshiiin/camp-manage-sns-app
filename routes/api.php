<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->session()->get("login_web_59ba36addc2b2f9401580f014c7f58ea4e30989d");
});


Route::group( ['middleware' => 'api'], function(){
    Route::get('/posts', 'PostController@getPosts');
});