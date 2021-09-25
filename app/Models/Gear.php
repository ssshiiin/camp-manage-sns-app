<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\GearCategoryResource;

class Gear extends Model
{
    protected $table = 'gears';
    
    
    protected $fillable = [
        'user_id', 'category', 'gear_name', 'brand', 'purchased_day', 'price', 'amount', 'image_path'
    ];
    
    //Userの所有するcategory別にしたgearsを取得
    public function getUserCategory($user_id){
        return GearCategoryResource::collection($this->where("user_id", $user_id)->groupBy("category")->orderBy('category', 'desc')->get());
    }

    // Userの所有するGearの数を取得
    public function getCountGear($user_id){
        return $this->where("user_id", $user_id)->count(); 
    }
    

    // リレーション
    public function saveGear(){
        return $this->hasMany('App\Models\Save_gear', 'gear_id');
    }
    
    public function bringGear(){
        return $this->hasOne('App\Models\BringGear', 'gear_id');
    }
    
    public function gearImages(){
        return $this->hasMany('App\Models\GearImage');
    }
}
