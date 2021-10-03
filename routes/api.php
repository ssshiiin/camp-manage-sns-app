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
    return auth()->user();
});


Route::group( ['middleware' => 'api'], function(){
    Route::get('/posts/place', 'PostController@getPlacePosts');



    Route::post('/update/save_gears/{save_gear}', 'Save_gearsController@postUserSave_gearsIs_check');
});