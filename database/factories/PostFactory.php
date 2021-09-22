<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        "user_id" => $faker->numberBetween(1, 10),
        'content' => $faker-> text,
        'day' => $faker-> dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y/m/d'),
        'place' => 'ふもとっぱら'
    ];
});
