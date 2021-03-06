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
use App\Models\GearImage;
use App\Models\BringGear;
use Storage;

class GearController extends Controller
{
    //プロフィール一覧表示
    public function index(User $user){
        $user_id = $user->id;

        $gears = new Gear;
        $gears_profile = $gears->getUserCategory($user_id);

        $gears_count = $gears->getCountGear($user_id);

        return [
            "gearsProfile" => $gears_profile,
            "countGears" => $gears_count, 
        ];
    }

    public function show(Gear $gear){
        return new GetUserGearsResource($gear);
    }
    
    //geatsとgear_imagesを作成して、s3に保存する
    public function create(CreateGearRequest $request, User $user){
        try{
            $user_id = $user->id;
            $file_image = $request->file("img");
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
                "is_check" => 0,
            ];
            
            $gear->fill($input)->save();
            $gear_id = $gear->id;
            
            
            //s3に画像を保存して、urlをgear_imagesに保存する
            
            $path = Storage::disk('s3')->putFile('/Gear_images', $file_image, 'public');

            if (empty($path)){
                throw new Exception("s3に保存できませんでした");
            } 

            GearImage::create([
                "gear_id" => $gear_id,
                "image_path" => Storage::disk('s3')->url($path),
            ]);
        } catch (Exception $es) {
            Gear::delete($gear);
        }
        return $this->index(User::find($user_id));
    }
    
    
    public function update(UpdateGearRequest $request, Gear $gear){
        try {
            $user_id = $gear->user_id;
            $gear_id = $gear->id;
            
            $file_image = $request->file("img");
            $gear_name = $request->input("gear_name");
            $category = $request->input("category");
            $brand = $request->input("brand");
            $purchased_day = $request->input("purchased_day");
            $price = $request->input("price");
            $amount = $request->input("amount");
            
            ///画像の変更があったか
            if (!empty($file_image)){
                $path = Storage::disk('s3')->putFile('/Gear_images', $file_image, 'public');
                if (empty($path)){
                    throw new Exception("s3への保存に失敗しました"); 
                }
                $gear_image = GearImage::where("gear_id", $gear_id)->first();
                $gear_image->image_path = Storage::disk('s3')->url($path);
                $gear_image->update();
            }
            
            $gear->gear_name = $gear_name;
            $gear->category = $category;
            $gear->brand = $brand;   
            $gear->purchased_day = $purchased_day;   
            $gear->price = $price;   
            $gear->amount = $amount;   
            $gear->update();
        } finally {
            return $this->index(User::find($user_id));
        }
    }
    
    public function destroy(Gear $gear){
        $user_id = $gear->user_id;
        GearImage::where("gear_id", $gear->id)->delete();
        $gear->delete();
        
        return $this->index(User::find($user_id));
    }
}  