<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    
    
    protected $fillable = [
        'user_id', 'content', 'image_path', 'day', 'place'
    ];
    
    public function orderByRecentPaginate(int $limit = 10){
           return $this->orderBy('created_at', 'DESC')->simplePaginate($limit);
    }
    
    
    
    public function tags(){
        return $this-> hasMany('App\Tag');
    }
}
