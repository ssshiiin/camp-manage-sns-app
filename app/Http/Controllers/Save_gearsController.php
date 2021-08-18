<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Save_gear;
use App\Gear;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Save_gearsCategoryIs_checkResource;

class Save_gearsController extends Controller
{
    public function getUserSave_gears(User $user, Save_gear $save_gear, Gear $gear){
        $user_id = $user->id;
        
        $categories = $save_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
    
    public function getCountTrue(User $user,Save_gear $save_gear){
        $user_id = $user->id;
        $categories = $save_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return response()->json([
            "countTrue"=>$save_gear->where("user_id", $user_id)->where("is_check", true)->count(), 
            "countAll"=>$save_gear->where("user_id", $user_id)->count()]);
    }
    
    public function postUserSave_gearsIs_check(Request $request, User $user, Save_gear $save_gear, Gear $gear){
        $user_id = $save_gear->id;
        
        $save_gear->is_check = $request->is_check;
        $save_gear->update();
        
        $categories = $save_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
}
