<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GearCategoryResource;
use App\Http\Resources\GearPaginateResource;
use App\Http\Resources\GearProfileResource;
use App\Gear;
use App\User;

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
}