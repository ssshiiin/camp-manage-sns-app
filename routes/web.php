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


// Route::get('/home', 'HomeController@index')->name('home');

// Route::get('/test', function () {
//     return view("test");
// });

//googleのログイン機能
Route::get('/auth/redirect', 'GoogleLoginController@getGoogleAuth');
Route::get('/login/callback', 'GoogleLoginController@authGoogleCallback');

//test mailtrap
Route::get('/mail', 'MailSendController@index');



Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');

// Route::group(['middleware' => 'auth'], function () {
//     Route::get('/{any}', function () {
//         return view('index');
//     })->where('any', '.*');
// });

