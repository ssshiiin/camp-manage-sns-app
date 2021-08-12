<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Template;
use Faker\Generator as Faker;

$factory->define(Template::class, function (Faker $faker) {
    return [
        'user_id' => $faker-> numberBetween($min = 1, $max = 10),  
        'gear_id' => $faker-> numberBetween($min = 1, $max = 200),  
        'index' => $faker-> numberBetween($min = 1, $max = 3)
    ];
});
