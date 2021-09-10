<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; 
use App\Template; 
use App\Bring_gear;
use App\Http\Resources\Save_gearsCategoryResource;

class TemplateController extends Controller
{
    public function getTemplates(User $user){
        $user_id = $user->id;
        $templates = Template::where("user_id", $user_id)->groupBy("template_name")->orderBy("created_at", "asc")->get("template_name");
        
        return response()->json($templates);
    }

    public function createTemplate(Request $request, User $user){    
        $user_id = $user->id;
        $categories = $request->bring_gears;
        $template_name = $request->template_name;

        foreach($categories as $category){
            foreach($category["gearList"] as $gear){
                Template::create([
                    "user_id" => $user_id,
                    "bring_gear_id" => $gear["id"],
                    "template_name" => $template_name,
                ]);
            }
        }

        return app()->make('App\Http\Controllers\TemplateController')->getTemplates(User::find($user_id));
    }
    
    public function useTemplate(Request $request, User $user){
        $user_id = $user->id;
        $template_name = $request->input(0);
        
        Bring_gear::where("user_id", $user_id)->each(function($i){
            $i->delete();
        });
        
        $bring_gear = Bring_gear::withTrashed()->whereNotNull("id")->with(["template" => function ($query) use($template_name){
            $query->where('templates.template_name', $template_name);
        }])->with("gear")->where("user_id", $user_id)->get();

        $collection = collect([]);

        $bring_gear->each(function ($i)use($collection, $bring_gear){
            if($bring_gear->find($i)->template->isNotEmpty()){
                $collection->push($bring_gear->find($i));  
                $bring_gear->find($i)->restore();
            }
        });
        
        
        $categories = $collection->where("user_id", $user_id)->groupBy("gear.category")->values();
        
        return Save_gearsCategoryResource::collection($categories);
    }
    
    
    public function deleteTemplate(Request $request, User $user){
        $user_id = $user->id;
        $template_name = $request->input(0);
        
        $templates = Template::where("user_id", $user_id)->where("template_name", $template_name)->get();
        
        $templates->each(function($i){
            $i->forceDelete();
        });
        
        return [];
    }
}
