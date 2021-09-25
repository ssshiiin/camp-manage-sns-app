<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dayout_info extends Model
{
    protected $table = 'dayout_infos';
    
    
    protected $fillable = [
        'camp_name', 'tel', 'home_page'
    ];
}
