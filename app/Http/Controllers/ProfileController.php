<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Profile;

class ProfileController extends Controller
{
    public function getProfile(User $user){
        $user_id = $user->id;
        
        $profiles = new Profile;
        return $profiles->where("user_id", $user_id)->first();
    }
    
    public function createOrEditProfile(Request $request, User $user){
        $user_id = $user->id;
        $app_name = $request->input(0);
        $content = $request->input(1);
        
        $profile = Profile::where("user_id", $user_id)->get();

        if($profile->isNotEmpty()){
            $profile->first()->app_name = $app_name;
            $profile->first()->profile = $content;   
            $profile->first()->update();
            dump($profile);
        }
        else {
            $input = [
                "user_id" => $user_id,
                "app_name" => $app_name,
                "profile" => $content,
                'created_at' => now(), 
                'updated_at' => now()
            ];
            Profile::insert($input);
        }
        
        return app()->make('App\Http\Controllers\ProfileController')->getProfile(User::find($user_id));
    }
}
