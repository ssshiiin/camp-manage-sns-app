<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\GetPostsResource;

class Post extends Model
{
    protected $table = 'posts';
    
    
    protected $fillable = [
        'user_id', 'content', 'image_path', 'day', 'place'
    ];
    
    // タイムライン用の投稿を取得
    public static function getTimeLinePosts($limit = 15){
        $posts = Post::with("nices")->orderBy("created_at", "DESC")->simplePaginate(15);
        
        return GetPostsResource::collection($posts);
    }

    //ユーザーのpostsを取得
    public function getUserPosts($user_id)
    {
        return $this->with("PostImages")->where('user_id', $user_id)->orderBy('created_at', 'DESC')->get();
    }

    //ユーザーの投稿した数を取得
    public function getCountPost($user_id){
        return $this->where("user_id", $user_id)->count();
    }


    
    
    
    //リレーション
    public function tags(){
        return $this->hasMany('App\Models\Tag');
    }
    
    public function postImages(){
        return $this->hasMany('App\Models\PostImage');
    }

    public function nices(){
        return $this->hasMany('App\Models\Nice');
    }
    
    public function user(){
        return $this->belongsTo('App\Models\User', "user_id");
    }
}
