<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Schedule extends Model
{
    protected $table = 'schedules';
    
    
    protected $fillable = [
        'user_id', 'place'
    ];

    public static function getTopRanking(){
        return DB::table("schedules")->select('place', DB::raw('count(*) as count'))->groupBy('place')->orderByRaw('count(*) desc')->take(3)->get();
    }

    public static function getMyRanking(){
        return DB::table("schedules")->select('place', DB::raw('count(*) as count'))->where("user_id", Auth::id())->groupBy('place')->orderByRaw('created_at desc')->take(3)->get();
    }
}
