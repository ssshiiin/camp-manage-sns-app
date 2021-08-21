<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gear_image extends Model
{
    protected $table = 'gear_images';
    
    protected $fillable = [
        'gear_id', 'image_path'
    ];
}
