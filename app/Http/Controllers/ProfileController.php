<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EditProfileRequest;
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
    public function createOrEditProfile(EditProfileRequest $request, User $user)
    {
        $user_id = $user->id;
        $image_file = $request->file("img");
        $app_name = $request->app_name;
        $content = $request->profile;

        $profile = Profile::where("user_id", $user_id)->get();
        
        // プロフィールが存在するかどうか
        if($profile->isNotEmpty()){
            ///プロフィール画像の変更があったか
            if (!$image_file){
                $image_path = Profile::where("user_id", $user_id)->first()->image_path;
            }
            else {
                $path = Storage::disk('s3')->putFile('/Profile_images', $image_file, 'public');
                $image_path = Storage::disk("s3")->url($path);
            }
            $profile->first()->image_path = $image_path;
            $profile->first()->app_name = $app_name;
            $profile->first()->profile = $content;   
            $profile->first()->update();
        }
        else {
            ///プロフィール画像の変更があったか
            if ($image_file){
                $path = Storage::disk('s3')->putFile('/Profile_images', $image_file, 'public');
                $image_path = Storage::disk("s3")->url($path);
            }
            else {
                $image_path = "";
            }
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
