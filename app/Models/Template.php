<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $table = 'templates';
    
    
    protected $fillable = [
            'user_id', 'bring_gear_id', 'template_name'  
        ];
        
    public function bring_gear(){
        return $this->belongsTo("App\Bring_gear");
    }
}
