<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'user_id' => $faker-> numberBetween($min = 1, $max = 10),  
        'content' => $faker-> text,
        'image_path' => '/images/prof.jpg',
        'day' => $faker-> dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y/m/d'),
        'place' => '中禅寺湖キャンプ場'
    ];
});
