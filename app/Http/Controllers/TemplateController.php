<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateTemplateRequest;
use App\models\User; 
use App\models\Template; 
use App\models\BringGear;
use App\Http\Resources\Save_gearsCategoryResource;

class TemplateController extends Controller
{
    public function index(User $user){
        $user_id = $user->id;
        $templates = Template::where("user_id", $user_id)->groupBy("template_name")->orderBy("created_at", "asc")->get("template_name");
        
        return [ "templates" => $templates];
    }

    public function store(CreateTemplateRequest $request, User $user){    
        $user_id = $user->id;
        $categories = $request->bring_gears;
        $template_name = $request->template_name;

        foreach($categories as $category){
            foreach($category["gear_list"] as $gear){
                Template::create([
                    "user_id" => $user_id,
                    "bring_gear_id" => $gear["id"],
                    "template_name" => $template_name,
                ]);
            }
        }

        return $this->index(User::find($user_id));
    }
    
    public function show(Request $request, User $user){
        $user_id = $user->id;
        $template_name = $request->template_name;

        BringGear::where("user_id", $user_id)->each(function($bring_gear){
            $bring_gear->delete();
        });
        
        BringGear::withTrashed()->where("user_id", $user_id)->with("template", "gear")->get()->each(function ($item) use ($template_name){
            if ($item->template->where("template_name", $template_name)->isNotEmpty()){
                $item->restore();
                $item->is_check = false;
                $item->update();
            } 
        });
        
        return app()->make('App\Http\Controllers\BringGearController')->index($user);
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
