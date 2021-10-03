<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nap_info;
use App\Models\Dayout_info;

class ScheduleController extends Controller
{
    public function search(Request $request){
        $search = $request->place;
        
        $nap = Nap_info::where("camp_name", "like", "%$search%")->first();
        $dayout = Dayout_info::where("camp_name", "like", "%$search%")->first();        

        return response()->json([
            "nap" => $nap,
            "dayout" => $dayout
        ]);
    }
}
