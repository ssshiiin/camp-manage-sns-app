<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Profile;
use Storage;

class ProfileController extends Controller
{
    // ログインユーザーのプロフィール情報の取得
    public function getProfile(User $user){
        $user_id = $user->id;
        
        return Profile::where("user_id", $user_id)->first();
    }
    
    
    // プロフィールが存在しなかったら、作成
    // プロフィールが存在したら、編集
    public function createOrEditProfile(Request $request, User $user)
    {
        $user_id = $user->id;
        $image_file = $request->file("0");
        $app_name = $request->app_name;
        $content = $request->profile;

        $profile = Profile::where("user_id", $user_id)->get();
        
        
        
        $path = Storage::disk('s3')->putFile('/Profile_images', $image_file, 'public');
        $image_path = Storage::disk("s3")->url($path);
        // プロフィールが存在するかどうか
        if($profile->isNotEmpty()){
            $profile->first()->image_path = $image_path;
            $profile->first()->app_name = $app_name;
            $profile->first()->profile = $content;   
            $profile->first()->update();
        }
        else {
            Profile::create([
                "user_id" => $user_id,
                "image_path" => $image_path,
                "app_name" => $app_name,
                "profile" => $content,
                'created_at' => now(), 
                'updated_at' => now(),
            ]);
        }
        
        
        // getProfileをレスポンスとして返す
        return app()->make('App\Http\Controllers\ProfileController')->getProfile(User::find($user_id));
    }
}
