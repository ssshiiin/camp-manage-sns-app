<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GearCategoryResource;
use App\Http\Resources\GearPaginateResource;
use App\Http\Resources\GearProfileResource;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Bring_gearsCategoriesResource;
use App\Gear;
use App\User;
use App\Bring_gear;

class GearController extends Controller
{
    public function getCategoryProfile(User $user, Gear $gear){
        $user_id = $user->id;
        return GearCategoryResource::collection($gear->whereUser_idGroupByCategoryPaginate($user_id));
    }
    
    public function getGearProfile(Request $request, User $user, Gear $gear){
        $user_id = $user->id;
        $category = $request->query->get("category");
        
        return GearProfileResource::collection($gear->whereUser_idAndWhereCategoryPaginate($user_id, $category));
    }
    
    public function getGearIndex(Gear $gear){
        return $gear;
    }
    
    public function getAddGear(User $user){
        $gear = new Gear;
        $bring_gear = new Bring_gear;
        
        $user_id = $user->id;
    
        $target = $gear->with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id");
        
        $categories = $target->groupBy("category")->values();
        
        return Bring_gearsCategoriesResource::collection($categories);
    }
    
    public function getCountTrue(User $user, Gear $gear, Bring_gear $bring_gear){
        $user_id = $user->id;
    
        $trueTarget = $gear->with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id");
        
        return response()->json([
            "countTrue"=>$trueTarget->where("is_check", true)->count(), 
            "countAll"=>$trueTarget->count()]);
    }
    
    public function postUserGearsIs_check(Request $request, User $user, Bring_gear $bring_gear, Gear $gear){
        $user_id = $gear->user_id;
        
        $gear->is_check = $request->is_check;
        $gear->update();
        
        return app()->make('App\Http\Controllers\GearController')->getAddGear(User::find($user_id));
    }
    
    public function getCountGear(User $user){
        $user_id = $user->id;
        
        $count = Gear::where("user_id", $user_id)->count();
        return $count;
    }
}