<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GearCategoryResource;
use App\Http\Resources\GearPaginateResource;
use App\Http\Resources\GetUserGearsResource;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Bring_gearsCategoriesResource;
use App\Http\Requests\CreateGearRequest;
use App\Http\Requests\UpdateGearRequest;
use App\Models\User;
use App\Models\Gear;
use App\Gear_image;
use App\Bring_gear;
use Storage;

class GearController extends Controller
{
    public function Show(Gear $gear){
        return new GetUserGearsResource($gear);
    }
    
    //geatsとgear_imagesを作成して、s3に保存する
    public function create(CreateGearRequest $request, User $user){
        $user_id = $user->id;
        $fileImage = $request->files;
        $gear_name = $request->input("gear_name");
        $category = $request->input("category");
        $brand = $request->input("brand");
        $purchased_day = $request->input("purchased_day");
        $price = $request->input("price");
        $amount = $request->input("amount");
        

        
        //gearsを作成し、作成したidをgear_idとして取得する
        $gear = new Gear;
        
        $input = [
            "user_id" => $user_id,
            "gear_name" => $gear_name,
            "category" => $category,
            "brand" => $brand,
            "purchased_day" => $purchased_day,
            "price" => $price,
            "amount" => $amount,
        ];
        
        $gear->fill($input)->save();
        $gear_id = $gear->id;
        
        
        //s3に画像を保存して、urlをgear_imagesに保存する
        foreach ($fileImage as $key => $value){
            $path = Storage::disk('s3')->putFile('/Gear_images', $request->file("img"), 'public');
            Gear_image::create([
                "gear_id" => $gear_id,
                "image_path" => Storage::disk('s3')->url($path),
            ]);
        }
        
        return app()->make('App\Http\Controllers\GearController')->getUserCategory(User::find($user_id));
    }
    
    
    public function update(UpdateGearRequest $request, Gear $gear){
        $user_id = $gear->user_id;
        $gear_id = $gear->id;
        
        $fileImage = $request->files;
        $gear_name = $request->input("gear_name");
        $category = $request->input("category");
        $brand = $request->input("brand");
        $purchased_day = $request->input("purchased_day");
        $price = $request->input("price");
        $amount = $request->input("amount");
        
        ///プロフィール画像の変更があったか
        if (empty($fileImage)){
            Gear_image::where("gear_id", $gear_id)->delete();
            foreach ($fileImage as $key => $value){
                $path = Storage::disk('s3')->putFile('/Gear_images', $request->file("img"), 'public');
                Gear_image::create([
                    "gear_id" => $gear_id,
                    "image_path" => Storage::disk('s3')->url($path),
                ]);
            }
        }
        
        $gear->gear_name = $gear_name;
        $gear->category = $category;
        $gear->brand = $brand;   
        $gear->purchased_day = $purchased_day;   
        $gear->price = $price;   
        $gear->amount = $amount;   
        $gear->update();
        
        return app()->make('App\Http\Controllers\GearController')->getUserCategory(User::find($user_id));
    }
    
    public function delete(Gear $gear){
        $user_id = $gear->user_id;
        Gear_image::where("gear_id", $gear->id)->delete();
        $gear->delete();
        
        return app()->make('App\Http\Controllers\GearController')->getUserCategory(User::find($user_id));
    }
}  