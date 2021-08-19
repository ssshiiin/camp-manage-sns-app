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
                    "bring_gear_id" => $gear["id"],
                    "template_name" => $template_name,
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
        $bring_gear = new Bring_gear;
        
        $user_id = $user->id;
        $template_name = $request->input(0);
        dump($template_name);
        
        dd($bring_gear->gear());
        
        dump($bring_gear->with("template")->get()->where("template.template_name", $template_name));
        dd($bring_gear->with("gear")->get()->where("gear.user_id", 10));
        
        dump($bring_gear->with(["template" => function ($query){
            $query->where("template_name", $template_name);
        }])->get());
        
        
        $categories = dd($bring_gear->with("gear")->with("template")->get()->where("user_id", $user_id)->groupBy("gear.category")->values());
        // ->where("template.template_name", $template_name)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
    
    public function getTemplates(User $user){
        $template = new Template;
        
        $user_id = $user->id;
        $templates = $template->where("user_id", $user_id)->groupBy("template_name")->get("template_name");
        
        return response()->json($templates);
    }
}
