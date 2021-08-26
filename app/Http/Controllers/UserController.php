<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    //全ユーザーのidを一次元配列で取得する
    public function getUserId(){
        $result = [];
        foreach (User::all() as $item){
            $result[] = $item->id;
            
        }
        return $result;
    }
}
