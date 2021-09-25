<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EditProfileRequest;
use App\Models\User;
use App\Models\Profile;
use Storage;

class ProfileController extends Controller
{
    // プロフィール情報一覧の表示
    public function index(User $user){
        $user_id = $user->id;

        $profiles = new Profile;
        $posts = new Post;
        $gears = new Gear;

        $profile_info = $profiles->getProfile($user_id);

        $posts_count = $gears->getCountPost($user_id);
        
        $gears_count = $gears->getCountGear($user_id);
        
        return [
            "profile_info" => $profile_info, 
            "posts_count" => $posts_count, 
            "gears_count" => $gears_count, 
        ];
    }
    
    
    // プロフィールが存在しなかったら、作成
    // プロフィールが存在したら、編集
    public function create(EditProfileRequest $request, User $user)
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
        
        
        // Profileをレスポンスとして返す
        $profiles = new Profile;

        return ["profile_info" => $profiles->getProfile($user_id)];
    }
}
