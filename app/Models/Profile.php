<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = "profiles";
    
    protected $fillable = [
        "user_id", "image_path", "app_name", "profile"
    ];
}
