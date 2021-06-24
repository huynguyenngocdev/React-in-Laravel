<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
});

Route::get('/contact', 'ContactController@index')->name('contact.all');

Route::post('/contact', 'ContactController@store')->name('contact.store'); /*<a href = "{{route('contact.store')}}">Link</a>*/

Route::get('/contact/{id}', 'ContactController@show')->name('contact.show');

Route::put('/contact/{id}', 'ContactController@update')->name('contact.update');

Route::delete('/contact/{id}', 'ContactController@destroy')->name('contact.destroy');

Route::post('/admin-contact/{id}', 'ContactController@adminMailToClient')->name('contact.admin');

Route::get('/export-contact', 'ContactController@exportContact')->name('contact.export');
