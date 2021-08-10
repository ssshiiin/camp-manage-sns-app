<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    
    
    protected $fillable = [
        'post_id', 'tag' 
    ];
}
