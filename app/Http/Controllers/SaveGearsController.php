<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SaveGear;
use App\Models\Gear;
use App\Http\Resources\SaveGearsYearMonthResource;

class SaveGearsController extends Controller
{
    public function index(User $user){
        $user_id = $user->id;

        $year_month = SaveGear::where('user_id', $user_id)->get()->map(function ($row) use ($user_id) {
            return ["year_month" => $row->created_at->format('Y/m'), 
            "user_id" => $user_id];
        })->unique("year_month")->sortByDesc("year_month");
        
        return SaveGearsYearMonthResource::collection($year_month);
    }

    public function store(Request $request){
        $user_id = $request->user_id;
        $gear_id = $request->gear_id;

        SaveGear::create([
            'user_id' => $user_id,
            'gear_id' => $gear_id
        ]);

        return $this->index(User::find($user_id));
    }
}
