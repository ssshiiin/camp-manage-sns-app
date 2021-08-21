<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post_image extends Model
{
    protected $table = 'post_images';
    
    protected $fillable = [
        'post_id', 'image_path'
    ];
}
