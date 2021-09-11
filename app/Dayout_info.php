<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dayout_info extends Model
{
    protected $table = 'dayout_infos';
    
    
    protected $fillable = [
        'camp_name', 'tel', 'home_page'
    ];
}
