<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gear extends Model
{
    protected $table = 'gears';
    
    
    protected $fillable = [
        'user_id', 'category', 'name', 'brand', 'purchased_day', 'price', 'amount', 'image_path'
    ];
    
    public function whereUser_idOrderByCreated_at($user_id){
        return $this->where("user_id", $user_id)->orderBy("created_at", "DESC")->get();
    }
    
    public function whereUser_idGroupByCategory($user_id){
        return $this->where("user_id", $user_id)->GroupBy("category")->get();
    }
}
