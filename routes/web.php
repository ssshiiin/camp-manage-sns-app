<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes(['verify' => true]);


//認証
Route::get('/users', 'UserController@getUserId');

Route::get('/auth/redirect', 'GoogleLoginController@getGoogleAuth');
Route::get('/login/callback', 'GoogleLoginController@authGoogleCallback');

Route::middleware('auth')->get('/user', function (Request $request) {
    return auth()->user();
});


//表示
Route::get('/posts', 'PostController@indexHome');

Route::get('/profiles/{user}', 'ProfileController@index');
Route::get('/posts/{user}', 'PostController@index');
Route::get('/gears/{user}', 'GearController@index');

Route::get('/bring_gears/{user}', 'BringGearController@index');
Route::get('/templates/{user}', 'TemplateController@index');

Route::get('/save_gears/{user}', 'SaveGearsController@index');

Route::post('/schedule/search', 'ScheduleController@search');

//詳細
Route::get('/posts/show/{post}', 'PostController@show');
Route::get('/gears/show/{gear}', 'GearController@show');
Route::post('/templates/show/{user}', 'TemplateController@show');

//作成
Route::post('/posts/create/{user}', 'PostController@create');
Route::post('/gears/create/{user}', 'GearController@create');
Route::post('/profiles/create/{user}', 'ProfileController@create');

Route::POST('/bring_gears/create/{user}', 'BringGearController@store');
Route::post('/templates/create/{user}', 'TemplateController@store');

Route::post('save_gears/create', 'SaveGearsController@store');

Route::post('/nices', 'NiceController@store');

//更新
Route::post('/posts/update/{post}', 'PostController@update');
Route::post('/gears/update/{gear}', 'GearController@update');

Route::put('/bring_gears/bring/{bring_gear}', 'BringGearController@updateBring');
Route::put('/bring_gears/brings/{user}', 'BringGearController@updateBringsAll');
Route::put('/bring_gears/not/bring/{gear}', 'BringGearController@updateNotBring');
Route::put('/bring_gears/not/brings/{user}', 'BringGearController@updateNotBringsAll');

//削除
Route::delete('/posts/delete/{post}', 'PostController@destroy');
Route::delete('/gears/delete/{gear}', 'GearController@destroy');

Route::delete('/bring_gears/delete/{user}', 'BringGearController@destroy');

Route::post('/nices/destroy', 'NiceController@destroy');

//未実装orテスト







Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');

// Route::group(['middleware' => 'auth'], function () {
    //     Route::get('/{any}', function () {
        //         return view('index');
        //     })->where('any', '.*');
        // });
        
        
//test mailtrap
Route::get('/mail', 'MailSendController@index');



