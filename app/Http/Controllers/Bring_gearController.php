<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Bring_gear;
use App\Gear;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Save_gearsCategoryIs_checkResource;
use App\Http\Resources\Bring_gearsCategoriesResource;

class Bring_gearController extends Controller
{
    public function getUserBring_gears(User $user, Bring_gear $bring_gear, Gear $gear){
        $user_id = $user->id;
        
        $categories = $bring_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
    
    public function getCountTrue(User $user,Bring_gear $bring_gear){
        $user_id = $user->id;
        $categories = $bring_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return response()->json([
            "countTrue"=>$bring_gear->where("user_id", $user_id)->where("is_check", true)->count(), 
            "countAll"=>$bring_gear->where("user_id", $user_id)->count()]);
    }
    
    public function postUserBring_gearsIs_check(Request $request, User $user, Bring_gear $bring_gear, Gear $gear){
        $user_id = $bring_gear->user_id;
        
        $bring_gear->is_check = $request->is_check;
        $bring_gear->update();
        
        $categories = $bring_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
    
    public function createBring_gear(User $user, Gear $gear, Bring_gear $bring_gear){
        $user_id = $user->id;
        $truegears = $gear->with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id")->where("is_check", true);
        
        foreach($truegears as $true){
            $input[] = [
            'user_id' => $user_id, 
            'gear_id' => $true->id,
            'is_check' => 0,
            'created_at' => now(), 
            'updated_at' => now()
            ];
            $true->is_check = 0;
            $true->update();
        }
        $bring_gear->insert($input);
        
        $target = $gear->with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id");
        
        $categories = $target->groupBy("category")->values();
        
        return Bring_gearsCategoriesResource::collection($categories);
    }
}
