<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nap_info;
use App\Models\Dayout_info;
use App\Models\Schedule;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function search(Request $request){
        $search = $request->place;
        
        $nap = Nap_info::where("camp_name", "like", "%$search%")->first();
        $dayout = Dayout_info::where("camp_name", "like", "%$search%")->first();        

        Schedule::create([
            "user_id" => Auth::id(),
            "place" => $nap->camp_name
        ]);

        return response()->json([
            "nap" => $nap,
            "dayout" => $dayout
        ]);
    }

    public function index(){
        $top = Schedule::getTopRanking();
        $my = Schedule::getMyRanking();


        return [
            "top" => $top,
            "my" => $my,
        ];
    }
}
