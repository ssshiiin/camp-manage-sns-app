<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BringGear;
use App\Models\Gear;
use App\Http\Resources\SaveGearsCategoryResource;
use App\Http\Resources\SaveGearsCategoryIsCheckResource;
use App\Http\Resources\BringGearsCategoriesResource;

class BringGearController extends Controller
{
    //持ち物リストの一覧表示
    public function index(User $user){
        $brings = $this->getBring($user);
        $not_brings = $this->getNotBring($user);
        $brings_count_all = $this->getBringCountAll($user);
        $brings_count_true = $this->getBringCountTrue($user);
        $not_brings_count_all = $this->getNotBringCountAll($user);
        $not_brings_count_true = $this->getNotBringCountTrue($user);

        return [
            "brings" => $brings,
            "not_brings" => $not_brings,
            "brings_count_all" => $brings_count_all,
            "brings_count_true" => $brings_count_true,
            "not_brings_count_all" => $not_brings_count_all,
            "not_brings_count_true" => $not_brings_count_true,
        ];
    }





    // 持ち物リストを取得
    public function getBring(User $user){
        $user_id = $user->id;
    
        $categories = BringGear::with("gear")->get()->where("user_id", $user_id)->sortByDesc("gear.category")->groupBy("gear.category")->values();
        
        return SaveGearsCategoryResource::collection($categories);
    }

    // 持ち物リストに追加していないギアを取得
    public function getNotBring(User $user){
        $bring_gear = new BringGear;
        
        $user_id = $user->id;
    
        $target = Gear::with("bringGear")->get()->where("user_id", $user_id)->whereNull("bringGear.gear_id");
        
        $categories = $target->sortByDesc("category")->groupBy("category")->values();
        
        return BringGearsCategoriesResource::collection($categories);
    }
    
    // 持ち物リストの合計を取得
    public function getBringCountAll(User $user){
        $user_id = $user->id;
        
        return BringGear::where("user_id", $user_id)->count();
    }
    
    // 持ち物リストのチャック済みの数を取得
    public function getBringCountTrue(User $user){
        $user_id = $user->id;
        
        return BringGear::where("user_id", $user_id)->where("is_check", true)->count();
    }
    
    // 持ち物リストに追加していないギアの合計を取得
    public function getNotBringCountAll(User $user){
        $user_id = $user->id;

        return Gear::with("bringGear")->get()->where("user_id", $user_id)->whereNull("bringGear.gear_id")->count();
    }

    // 持ち物リストに追加していないギアのチャック済みの数を取得
    public function getNotBringCountTrue(User $user){
        $user_id = $user->id;

        return Gear::with("bringGear")->get()->where("user_id", $user_id)->where("is_check", true)->whereNull("bringGear.gear_id")->count(); 
    }
    



    // 持ち物のチェックを更新
    public function updateBring(Request $request, BringGear $bring_gear){
        $user_id = $bring_gear->user_id;
        
        $bring_gear->is_check = $request->is_check;
        $bring_gear->update();

        $user = User::find($user_id);
        
        $brings = $this->getBring($user);
        $brings_count_all = $this->getBringCountAll($user);
        $brings_count_true = $this->getBringCountTrue($user);
        
        return [
            "brings" => $brings,
            "brings_count_all" => $brings_count_all,
            "brings_count_true" => $brings_count_true,
        ];
    }
    
    // 持ち物のチェックを全て更新
    public function updateBringsAll(Request $request, User $user){
        $user_id = $user->id;
        $is_check = $request->is_check;

        if ($is_check){
            $bring_gears = BringGear::where("user_id", $user_id)->where("is_check", false)->get();
        }
        else {
            $bring_gears = BringGear::where("user_id", $user_id)->where("is_check", true)->get();
        }

        foreach($bring_gears as $bring_gear){
            $bring_gear->is_check = $is_check;
            $bring_gear->update();
        }
        
        $brings = $this->getBring($user);
        $brings_count_all = $this->getBringCountAll($user);
        $brings_count_true = $this->getBringCountTrue($user);
        
        return [
            "brings" => $brings,
            "brings_count_all" => $brings_count_all,
            "brings_count_true" => $brings_count_true,
        ];
    }

    // 持ち物リストに追加していないギアのチェックを更新
    public function updateNotBring(Request $request, Gear $gear){
        $user_id = $gear->user_id;
    
        $gear->is_check = $request->is_check;
        $gear->update();

        $user = User::find($user_id);

        $not_brings = $this->getNotBring($user);
        $not_brings_count_all = $this->getNotBringCountAll($user);
        $not_brings_count_true = $this->getNotBringCountTrue($user);
        
        return [
            "not_brings" => $not_brings,
            "not_brings_count_all" => $not_brings_count_all,
            "not_brings_count_true" => $not_brings_count_true,
        ];
    }

    // 持ち物リストに追加していないギアのチェックを全て更新
    public function updateNotBringAll(Request $request, User $user){
        $user_id = $user->id;
        $is_check = $request->is_check;

        if ($is_check){
            $gears = Gear::with("bringGear")->get()->where("user_id", $user_id)->whereNull("bringGear.gear_id")->where("is_check", false);
        }
        else {
            $gears = Gear::with("bringGear")->get()->where("user_id", $user_id)->whereNull("bringGear.gear_id")->where("is_check", true);
        }
            
        foreach($gears as $gear){
            $gear->is_check = $is_check;
            $gear->update();
        }
        
        $not_brings = $this->getNotBring($user);
        $not_brings_count_all = $this->getNotBringCountAll($user);
        $not_brings_count_true = $this->getNotBringCountTrue($user);
        
        return [
            "not_brings" => $not_brings,
            "not_brings_count_all" => $not_brings_count_all,
            "not_brings_count_true" => $not_brings_count_true,
        ];
    }


    // 持ち物リストに追加する
    public function store(User $user){
        $user_id = $user->id;
        $true_gears = Gear::with("bringGear")->get()->where("user_id", $user_id)->whereNull("bringGear.gear_id")->where("is_check", true);
        
        foreach($true_gears as $gear){
            BringGear::create([
            'user_id' => $user_id, 
            'gear_id' => $gear->id,
            'is_check' => 0,
            ]);
            $gear->is_check = 0;
            $gear->update();
        }
        
        return $this->index($user);
    }
    
    //持ち物リストから削除
    public function destroy(User $user){
        $user_id = $user->id;
        $true_not_brings = BringGear::where("user_id", $user_id)->where("is_check", true)->get();
        
        foreach($true_not_brings as $gear){
            $gear->delete();
        }

        return $this->index($user);
    }
}
