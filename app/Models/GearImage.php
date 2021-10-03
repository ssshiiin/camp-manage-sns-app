<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GearImage extends Model
{
    protected $table = 'gear_images';
    
    protected $fillable = [
        'gear_id', 'image_path'
    ];
}
