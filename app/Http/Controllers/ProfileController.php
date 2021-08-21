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
    
    public function editProfile(Request $request, Profile $profile){
        $user_id = $profile->user_id;
        $app_name = $request->input(0);
        $content = $request->input(1);
        
        $profile->app_name = $app_name;
        $profile->profile = $content;
        $profile->update();
        
        return app()->make('App\Http\Controllers\ProfileController')->getProfile(User::find($user_id));
    }
}
