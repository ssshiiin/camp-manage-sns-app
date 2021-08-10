<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gear extends Model
{
    protected $table = 'gears';
    
    
    protected $fillable = [
        'user_id', 'category', 'name', 'brand', 'purchased_day', 'price', 'amount', 'image_path'
    ];
}
