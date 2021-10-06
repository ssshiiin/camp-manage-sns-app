<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Nice;
use App\Models\Post;

class NiceController extends Controller
{
    public function store(Request $request){
        $user_id = $request->user_id;
        $post_id = $request->post_id;
        Nice::create([
            "user_id" => $user_id,
            "post_id" => $post_id
        ]);

        return;
    }

    public function destroy(Request $request){
        $user_id = $request->user_id;
        $post_id = $request->post_id;
        Nice::where("user_id", $user_id)->where("post_id", $post_id)->delete();

        return;
    }
}
