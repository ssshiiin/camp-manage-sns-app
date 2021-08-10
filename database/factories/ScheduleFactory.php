<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Schedule;
use Faker\Generator as Faker;

$factory->define(Schedule::class, function (Faker $faker) {
    return [
        'user_id' => $faker-> numberBetween($min = 1, $max = 50),  
        'place' => 'ふもとっぱら',
        'day' => $faker-> dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y/m/d'),
    ];
});
