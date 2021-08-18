<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bring_gear;
use Faker\Generator as Faker;

$factory->define(Bring_gear::class, function (Faker $faker) {
    return [
        'user_id' => 5,  
        'gear_id' => 4,  
        'is_check' => 0,  
    ];
});
