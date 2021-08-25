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
    Route::get('/posts', 'PostController@getPosts');
    Route::get('/posts/{user}', 'PostController@getUserPosts');
    Route::post('/posts/create/{user}', 'PostController@createPost');
    
    Route::get('/profiles/{user}', 'ProfileController@getProfile');
    Route::post('/profiles/edit/{user}', 'ProfileController@createOrEditProfile');
    
    Route::get('/gears/{user}', 'GearController@getGearProfile');
    Route::post('/gears/create/{user}', 'GearController@createGear');
    
    
    
    Route::get('/posts/{user}/{post}', 'PostController@getPostIndex');
    Route::get('/categories/{user}', 'GearController@getCategoryProfile');
    Route::get('/gear/{gear}', 'GearController@getGearIndex');
    
    
    
    Route::post('/create/templates/{user}', 'TemplateController@createTemplate');
    Route::post('/templates/use/{user}', 'TemplateController@useTemplate');
    Route::post('/templates/delete/{user}', 'TemplateController@deleteTemplate');
    
    Route::post('/create/bring_gears/{user}', 'Bring_gearController@createBring_gear');
    Route::post('/delete/bring_gears/{bring_gear}', 'Bring_gearController@deleteBring_gear');
    Route::post('/all/delete/bring_gears/{user}', 'Bring_gearController@allDeleteBring_gear');
    Route::post('/update/gears/{gear}', 'GearController@postUserGearsIs_check');
    Route::post('/update/bring_gears/{bring_gear}', 'Bring_gearController@postUserBring_gearsIs_check');
    Route::post('/update/save_gears/{save_gear}', 'Save_gearsController@postUserSave_gearsIs_check');
    
    
    Route::get('/count/true/add/{user}', 'GearController@getCountTrue');
    Route::get('/count/true/bring/{user}', 'Bring_gearController@getCountTrue');
    Route::get('/count/true/{user}', 'Save_gearsController@getCountTrue');
    
    Route::get('/count/post/{user}', 'PostController@getCountPost');
    Route::get('/count/gear/{user}', 'GearController@getCountGear');
    
    Route::get('/templates/{user}', 'TemplateController@getTemplates');
    Route::get('/save_gears/{user}', 'Save_gearsController@getUserSave_gears');
    Route::get('/bring_gears/{user}', 'Bring_gearController@getUserBring_gears');
    Route::get('/add/gears/{user}', 'GearController@getAddGear');
});