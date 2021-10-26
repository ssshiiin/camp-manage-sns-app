<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Tag;
use Faker\Generator as Faker;

$factory->define(Tag::class, function (Faker $faker) {
    return [
        'post_id' => $faker-> numberBetween($min = 1, $max = 200),  
        'tag' => 'ハッシュタグ',
    ];
});
