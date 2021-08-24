<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Profile;

class ProfileController extends Controller
{
    // ログインユーザーのプロフィール情報の取得
    public function getProfile(User $user){
        $user_id = $user->id;
        
        return Profile::where("user_id", $user_id)->first();
    }
    
    
    // プロフィールが存在しなかったら、作成
    // プロフィールが存在したら、編集
    public function createOrEditProfile(Request $request, User $user){
        $user_id = $user->id;
        $app_name = $request->input(0);
        $content = $request->input(1);

        $profile = Profile::where("user_id", $user_id)->get();
        
        
        // プロフィールが存在するかどうか
        if($profile->isNotEmpty()){
            $profile->first()->app_name = $app_name;
            $profile->first()->profile = $content;   
            $profile->first()->update();
        }
        else {
            Profile::create([
                "user_id" => $user_id,
                "app_name" => $app_name,
                "profile" => $content,
                'created_at' => now(), 
                'updated_at' => now()
            ]);
        }
        
        
        // getProfileをレスポンスとして返す
        return app()->make('App\Http\Controllers\ProfileController')->getProfile(User::find($user_id));
    }
}
