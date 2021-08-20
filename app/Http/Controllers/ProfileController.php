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
}
