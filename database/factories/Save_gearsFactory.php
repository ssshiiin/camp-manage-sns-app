<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Save_gear;
use Faker\Generator as Faker;

$factory->define(Save_gear::class, function (Faker $faker) {
    return [
        'user_id' => $faker-> numberBetween($min = 1, $max = 10),  
        'gear_id' => $faker-> unique->numberBetween($min = 1, $max = 200),  
        'is_check' => $faker-> numberBetween($min = 0, $max = 1),  
    ];
});
