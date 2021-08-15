<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gear extends Model
{
    protected $table = 'gears';
    
    
    protected $fillable = [
        'user_id', 'category', 'name', 'brand', 'purchased_day', 'price', 'amount', 'image_path'
    ];
    
    public function whereUser_idAndWhereCategory($user_id, $category){
        return $this->where("user_id", $user_id)->where("category", $category)->get();
    }
    
    public function whereUser_idGroupByCategoryPaginate($user_id, $limit = 7){
        return $this->where("user_id", $user_id)->groupBy("category")->paginate($limit);
    }
    
    public function whereUser_idAndWhereCategoryPaginate($user_id, $category, $limit = 4){
        return $this->where("user_id", $user_id)->where("category", $category)->paginate($limit);
    }
}
