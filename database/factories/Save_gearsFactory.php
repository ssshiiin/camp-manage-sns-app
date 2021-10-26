<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SaveGear;
use Faker\Generator as Faker;

$factory->define(SaveGear::class, function (Faker $faker) {
    return [
        'user_id' => $faker-> numberBetween($min = 1, $max = 10),  
        'gear_id' => $faker-> unique->numberBetween($min = 1, $max = 200),  
        'created_at' => $faker->dateTimeBetween($startDate = '-10 years', $endDate = 'now')
    ];
});
