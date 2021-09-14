<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nap_info;
use App\Dayout_info;

class ScheduleController extends Controller
{
    public function searchSchedulePlace(Request $request){
        $search = $request->place;
        
        $nap = Nap_info::where("camp_name", "like", "%$search%")->first();
        $dayout = Dayout_info::where("camp_name", "like", "%$search%")->first();        

        return response()->json([
            "nap" => $nap,
            "dayout" => $dayout
        ]);
    }
}
