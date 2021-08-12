<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GearProfileResource;
use App\Http\Resources\GearCategoryResource;
use App\Gear;
use App\User;

class GearController extends Controller
{
    public function getGearsProfile(User $user, Gear $gear){
        $user_id = $user->id;
        return GearProfileResource::collection($gear->whereUser_idOrderByCreated_at($user_id));
    }

    public function getGearsProfileCategory(User $user, Gear $gear){
        $user_id = $user->id;
        return GearCategoryResource::collection($gear->whereUser_idGroupByCategory($user_id));
    }
}