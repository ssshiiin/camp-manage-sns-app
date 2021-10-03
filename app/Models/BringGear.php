<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BringGear extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    

    protected $table = "bring_gears";
    
    protected $fillable = [
        'user_id', 'gear_id', 'is_check'
    ];
    
    public function gear(){
        return $this->belongsTo('App\Models\Gear');
    }
    
    public function template(){
        return $this->hasMany('App\Models\Template', 'bring_gear_id');
    }
}
