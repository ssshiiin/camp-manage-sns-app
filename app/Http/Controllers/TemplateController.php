<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; 
use App\Template; 
use App\Bring_gear;
use App\Http\Resources\Save_gearsCategoryResource;

class TemplateController extends Controller
{
    public function createTemplate(Request $request, User $user){
        $bring_gear = new Bring_gear;
        $template = new Template;
        
        $user_id = $user->id;
        $categories = $request->input(0);
        $template_name = $request->input(1);

        $input = array();
        foreach($categories as $category){
            foreach($category["gearList"] as $gear){
                $input[] = [
                    "user_id" => $user_id,
                    "gear_id" => $gear["gear_id"],
                    "template_name" => $template_name,
                    'is_check' => 0,
                    'created_at' => now(), 
                    'updated_at' => now(),
                ];
            }
        }
        $template->insert($input);
        return 0;
    }
    
    public function useTemplate(Request $request, User $user){
        $template = new Template;
        $user_id = $user->id;
        $template_name = $request->input(0);
        
        $categories = $template->with("gear")->get()->where("user_id", $user_id)->where("template_name", $template_name)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
}
