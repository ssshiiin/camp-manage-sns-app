<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bring_gear;
use Faker\Generator as Faker;

$factory->define(Bring_gear::class, function (Faker $faker) {
    return [
        'user_id' => 6,  
        'gear_id' => 41,  
        'is_check' => 1,  
    ];
});
