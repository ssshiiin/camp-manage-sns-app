<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaveGear extends Model
{
    protected $table = 'save_gears';
    
    
    protected $fillable = [
        'user_id', 'gear_id', 'is_check'
    ];
    
    public function gear(){
        return $this->belongsTo('App\Models\Gear');
    }
}
