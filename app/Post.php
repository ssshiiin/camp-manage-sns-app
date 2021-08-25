<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    
    
    protected $fillable = [
        'user_id', 'content', 'image_path', 'day', 'place'
    ];
    
    public function orderByRecentPaginate($limit = 10){
           return $this->orderBy('created_at', 'DESC')->simplePaginate($limit);
    }
    
    public function whereUser_idAndPost_id($user_id, $post_id){
        return $this->where('user_id', $user_id)->where('id', $post_id)->get();
    }
    
    
    
    //リレーション
    public function tags(){
        return $this->hasMany('App\Tag');
    }
    
    public function post_images(){
        return $this->hasMany('App\Post_image');
    }
    
    public function user(){
        return $this->belongsTo('App\User', "user_id");
    }
}
