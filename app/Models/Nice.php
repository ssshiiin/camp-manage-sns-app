<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nice extends Model
{
    protected $table = "nices";

    protected $fillable = ["user_id", "post_id"];

    // リレーション
    public function user(){
        return $this->belongsTo('App\Models\User', 'id');
    }
}
