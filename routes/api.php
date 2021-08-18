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
    Route::get('/categories/{user}', 'GearController@getCategoryProfile');
    Route::get('/gears/{user}', 'GearController@getGearProfile');
    Route::get('/gear/{gear}', 'GearController@getGearIndex');
    
    Route::get('/create/bring_gears/{user}', 'Bring_gearController@createBring_gear');
    Route::get('/delete/bring_gears/{bring_gear}', 'Bring_gearController@deleteBring_gear');
    
    Route::post('/update/gears/{gear}', 'GearController@postUserGearsIs_check');
    Route::post('/update/bring_gears/{bring_gear}', 'Bring_gearController@postUserBring_gearsIs_check');
    Route::post('/update/save_gears/{save_gear}', 'Save_gearsController@postUserSave_gearsIs_check');
    Route::get('/count/true/add/{user}', 'GearController@getCountTrue');
    Route::get('/count/true/bring/{user}', 'Bring_gearController@getCountTrue');
    Route::get('/count/true/{user}', 'Save_gearsController@getCountTrue');
    
    Route::get('/save_gears/{user}', 'Save_gearsController@getUserSave_gears');
    Route::get('/bring_gears/{user}', 'Bring_gearController@getUserBring_gears');
    Route::get('/add/gears/{user}', 'GearController@getAddGear');
});