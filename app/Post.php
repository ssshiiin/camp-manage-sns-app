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
    
    public function whereUser_idOrderByCreated_at($user_id){
        return $this->where('user_id', $user_id)->orderBy('created_at', 'DESC')->get();
    }
    
    public function whereUser_idAndPost_id($user_id, $post_id){
        return $this->where('user_id', $user_id)->where('id', $post_id)->get();
    }
    
    
    public function tags(){
        return $this-> hasMany('App\Tag');
    }
}
