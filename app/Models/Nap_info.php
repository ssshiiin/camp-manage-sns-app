<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nap_info extends Model
{
    protected $table = 'nap_infos';
    
    
    protected $fillable = [
        'camp_name', 'address', 'check_in', 'check_out'
    ];
}
