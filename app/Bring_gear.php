<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bring_gear extends Model
{
    protected $table = "bring_gears";
    
    protected $fillable = [
        'user_id', 'gear_id', 'is_check'
    ];
    
    public function gear(){
        return $this->belongsTo('App\Gear');
    }
    
    public function template(){
        return $this->hasMany('App\Template', 'bring_gear_id');
    }
}
