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


//googleのログイン機能
Route::get('/auth/redirect', 'GoogleLoginController@getGoogleAuth');
Route::get('/login/callback', 'GoogleLoginController@authGoogleCallback');

Route::middleware('auth')->get('/user', function (Request $request) {
    return auth()->user();
});


Route::get('/posts', 'PostController@indexHome');
Route::get('/posts/profile/{user}', 'PostController@indexProfile');




Route::get('/bring_gears/{user}', 'BringGearController@index');
Route::put('/bring_gears/bring/{bring_gear}', 'BringGearController@updateBring');
Route::put('/bring_gears/brings/{user}', 'BringGearController@updateBringsAll');
Route::put('/bring_gears/not/bring/{gear}', 'BringGearController@updateNotBring');
Route::put('/bring_gears/not/brings/{user}', 'BringGearController@updateNotBringsAll');
Route::POST('/bring_gears/{user}', 'BringGearController@store');
Route::DELETE('/bring_gears/{user}', 'BringGearController@destroy');













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



