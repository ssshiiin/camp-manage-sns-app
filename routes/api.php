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
    Route::get('/posts/{user}/{post}', 'PostController@getPostIndex');
    Route::get('/posts/{user}', 'PostController@getPostsProfile');
    Route::get('/posts', 'PostController@getPosts');
    Route::get('/gears/category/{user}', 'GearController@getGearsProfileCategory');
    Route::get('/gears/{user}', 'GearController@getGearsProfile');
});