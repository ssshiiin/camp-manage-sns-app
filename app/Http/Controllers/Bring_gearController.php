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
    public function getUserBring_gears(User $user){
        $user_id = $user->id;
        
        $categories = Bring_gear::with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category")->sortByDesc("gear.category")->values()
;
        
        return Save_gearsCategoryResource::collection($categories);
    }

    public function getAddGear(User $user){
        $bring_gear = new Bring_gear;
        
        $user_id = $user->id;
    
        $target = Gear::with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id");
        
        $categories = $target->groupBy("category")->sortByDesc("gear.category")->values();
        
        return Bring_gearsCategoriesResource::collection($categories);
    }
    
    public function getCountAll(User $user,Bring_gear $bring_gear){
        $user_id = $user->id;
        $categories = $bring_gear->with("gear")->get()->where("user_id", $user_id)->groupBy("gear.category");
        
        return response()->json([
            "countTrue"=>$bring_gear->where("user_id", $user_id)->where("is_check", true)->count(), 
            "countAll"=>$bring_gear->where("user_id", $user_id)->count()]);
    }

    public function getCountAllAdd(User $user){
        $user_id = $user->id;

        return response()->json([
            "countTrue"=>Gear::with("bring_gear")->get()->where("user_id", $user_id)->where("is_check", true)->whereNull("bring_gear.gear_id")->count(), 
            "countAll"=>Gear::with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id")->count()]);
    }
    
    public function updateIs_check(Request $request, Bring_gear $bring_gear){
        $user_id = $bring_gear->user_id;
        
        $bring_gear->is_check = $request->is_check;
        $bring_gear->update();
        
        return app()->make('App\Http\Controllers\Bring_gearController')->getUserBring_gears(User::find($user_id));
    }

    public function updateAllIs_check(Request $request, User $user){
        $user_id = $user->id;
        $is_check = $request->is_check;

        if ($is_check){
            $bring_gears = Bring_gear::where("user_id", $user_id)->where("is_check", false)->get();
        }
        else {
            $bring_gears = Bring_gear::where("user_id", $user_id)->where("is_check", true)->get();
        }

        foreach($bring_gears as $bring_gear){
            $bring_gear->is_check = $is_check;
            $bring_gear->update();
        }
        
        return app()->make('App\Http\Controllers\Bring_gearController')->getUserBring_gears(User::find($user_id));
    }

    public function updateAddIs_check(Request $request, Gear $gear){
        $user_id = $gear->user_id;
    
        $gear->is_check = $request->is_check;
        $gear->update();
        
        return app()->make('App\Http\Controllers\Bring_gearController')->getAddGear(User::find($user_id));
    }

    public function updateAllAddIs_check(Request $request, User $user){
        $user_id = $user->id;
        $is_check = $request->is_check;

        if ($is_check){
            $gears = Gear::with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id")->where("is_check", false);
        }
        else {
            $gears = Gear::with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id")->where("is_check", true);
        }
            
        foreach($gears as $gear){
            $gear->is_check = $is_check;
            $gear->update();
        }
        
        return app()->make('App\Http\Controllers\Bring_gearController')->getAddGear(User::find($user_id));
    }
    
    public function createBring_gear(User $user){
        $user_id = $user->id;
        $truegears = Gear::with("bring_gear")->get()->where("user_id", $user_id)->whereNull("bring_gear.gear_id")->where("is_check", true);
        
        foreach($truegears as $gear){
            Bring_gear::create([
            'user_id' => $user_id, 
            'gear_id' => $gear->id,
            'is_check' => 0,
            ]);
            $gear->is_check = 0;
            $gear->update();
        }
        
        return app()->make('App\Http\Controllers\Bring_gearController')->getUserBring_gears(User::find($user_id));
    }
    
    public function deleteBring_gear(User $user){
        $user_id = $user->id;
        $truebring_gears = Bring_gear::where("user_id", $user_id)->where("is_check", true)->get();
        
        foreach($truebring_gears as $bring_gear){
            $bring_gear->delete();
        }

        return app()->make('App\Http\Controllers\Bring_gearController')->getUserBring_gears(User::find($user_id));
    }
}
