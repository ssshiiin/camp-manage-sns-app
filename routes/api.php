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
    Route::get('/users', 'UserController@getUserId');
    

    Route::get('/posts', 'PostController@getPosts');
    Route::get('/posts/{user}', 'PostController@getUserPosts');
    Route::get('/posts/show/{post}', 'PostController@getShowPost');
    Route::post('/posts/create/{user}', 'PostController@createPost');
    Route::post('/posts/delete/{post}', 'PostController@deletePost');
    Route::post('/posts/update/{post}', 'PostController@updatePost');

    
    Route::get('/profiles/{user}', 'ProfileController@getProfile');
    Route::post('/profiles/edit/{user}', 'ProfileController@createOrEditProfile');


    Route::get('/count/posts/{user}', 'PostController@getCountPost');
    Route::get('/count/gears/{user}', 'GearController@getCountGear');
    

    Route::get('/gears/{user}', 'GearController@getUserGears');
    Route::get('/gears/category/{user}', 'GearController@getUserCategory');
    Route::get('/gears/show/{gear}', 'GearController@getShowGear');
    Route::post('/gears/create/{user}', 'GearController@createGear');
    Route::post('/gears/delete/{gear}', 'GearController@deleteGear');
    Route::post('/gears/update/{gear}', 'GearController@updateGear');
    

    Route::get('/bring_gears/{user}', 'Bring_gearController@getUserBring_gears');
    Route::get('/bring_gears/add/{user}', 'Bring_gearController@getAddGear');
    Route::get('/bring_gears/countAll/{user}', 'Bring_gearController@getCountAll');
    Route::get('/bring_gears/countAll/add/{user}', 'Bring_gearController@getCountAllAdd');
    Route::post('/bring_gears/update/{bring_gear}', 'Bring_gearController@updateIs_check');
    Route::post('/bring_gears/update/all/{user}', 'Bring_gearController@updateAllIs_check');
    Route::post('/bring_gears/update/add/{gear}', 'Bring_gearController@updateAddIs_check');
    Route::post('/bring_gears/update/add/all/{user}', 'Bring_gearController@updateAllAddIs_check');
    Route::post('/bring_gears/create/{user}', 'Bring_gearController@createBring_gear');
    Route::post('/bring_gears/delete/{user}', 'Bring_gearController@deleteBring_gear');
    
    
    Route::get('/templates/{user}', 'TemplateController@getTemplates');
    Route::post('/templates/create/{user}', 'TemplateController@createTemplate');
    Route::post('/templates/use/{user}', 'TemplateController@useTemplate');
    Route::post('/templates/delete/{user}', 'TemplateController@deleteTemplate');
    
    Route::post('/update/save_gears/{save_gear}', 'Save_gearsController@postUserSave_gearsIs_check');
    
    
    
    
    Route::get('/save_gears/{user}', 'Save_gearsController@getUserSave_gears');
});