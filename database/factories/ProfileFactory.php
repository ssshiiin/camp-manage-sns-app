<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Profile;
use Faker\Generator as Faker;

$factory->define(Profile::class, function (Faker $faker) {
    return [
        "user_id" => $faker->unique()->numberBetween($min = 1, $max = 10),
        "app_name" => $faker->name,
        "profile" => $faker->text,
    ];
});
