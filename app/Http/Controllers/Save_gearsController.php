<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Save_gear;
use App\Gear;
use App\Http\Resources\Save_gearsCategoryResource;
use App\Http\Resources\Save_gearsCategoryIs_checkResource;
use App\Http\Resources\SaveGearsYearMonthResource;

class Save_gearsController extends Controller
{
    public function getUserSaveGears(User $user){
        $user_id = $user->id;

        $year_month = Save_gear::where('user_id', $user_id)->get()->map(function ($row) use ($user_id) {
            return ["year_month" => $row->created_at->format('Y/m'), 
            "user_id" => $user_id];
        })->unique("year_month")->sortByDesc("year_month");
        
        return SaveGearsYearMonthResource::collection($year_month);
    }

    public function createSaveGears(Request $request){
        $user_id = $request->user_id;
        $gear_id = $request->gear_id;

        Save_gear::create([
            'user_id' => $user_id,
            'gear_id' => $gear_id
        ]);

        return;
    }
}
