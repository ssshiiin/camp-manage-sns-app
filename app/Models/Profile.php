<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = "profiles";
    
    protected $fillable = [
        "user_id", "image_path", "app_name", "profile"
    ];

    // ユーザーのプロフィール情報の取得
    public function getProfile($user_id){
        return Profile::where("user_id", $user_id)->first();
    }
}
