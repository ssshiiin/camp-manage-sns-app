<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GearCategoryResource;
use App\Http\Resources\GearPaginateResource;
use App\Http\Resources\GetUserGearsResource;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Bring_gearsCategoriesResource;
use App\User;
use App\Gear;
use App\Gear_image;
use App\Bring_gear;
use Storage;

class GearController extends Controller
{
    //Userの所有するcategory別にしたgears
    public function getUserCategory(User $user){
        $user_id = $user->id;
        //categoryとuser_idからgearsという配列にgearを入れる
        return GearCategoryResource::collection(Gear::where("user_id", $user_id)->groupBy("category")->orderBy('category', 'desc')->get());
    }
    

    public function getUserCategories(User $user){
        $user_id = $user->id;
        $category = $request->query->get("category");
        
        return GetUserGearsResource::collection($gear->whereUser_idAndWhereCategoryPaginate($user_id, $category));
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
    
    //geatsとgear_imagesを作成して、s3に保存する
    public function createGear(Request $request, User $user){
        $user_id = $user->id;
        $fileImage = $request->files;
        $gear_name = $request->input("gearName");
        $category = $request->input("category");
        $brand = $request->input("brand");
        $purchased_day = $request->input("purchasedDay");
        $price = $request->input("price");
        $amount = $request->input("amount");
        
        
        //gearsを作成し、作成したidをgear_idとして取得する
        $gear = new Gear;
        
        $input = [
            "user_id" => $user_id,
            "gear_name" => $gear_name,
            "category" => $category,
            "brand" => $brand,
            "purchasedDay" => $purchased_day,
            "price" => $price,
            "amount" => $amount,
        ];
        
        $gear->fill($input)->save();
        $gear_id = $gear->id;
        
        
        //s3に画像を保存して、urlをgear_imagesに保存する
        foreach ($fileImage as $key => $value){
            $path = Storage::disk('s3')->putFile('/Gear_images', $request->file($key), 'public');
            Gear_image::create([
                "gear_id" => $gear_id,
                "image_path" => Storage::disk('s3')->url($path),
            ]);
        }
        
        //getUserPostsを返り値として返す
        // return app()->make('App\Http\Controllers\PostController')->getUserPosts(User::find($user_id));
    }
}