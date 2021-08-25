<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Gear;
use Faker\Generator as Faker;

$factory->define(Gear::class, function (Faker $faker) {
    return [
        'user_id' => $faker -> numberBetween($min = 1, $max = 10),  
        'category' => $faker -> randomElement($array = ['テント', 'タープ', 'シュラフ', 'クッカー', 'ランタン', '焚火台', 'テーブル', '椅子']),
        'gear_name' => 'サーカスTC',
        'brand' => 'テンマクデザイン',
        'purchased_day' => $faker-> dateTimeBetween($startDate = '-10 years', $endDate = 'now')->format('Y/m/d'),
        'price' => $faker-> numberBetween($min = 3000, $max = 999999),  
        'amount' => $faker-> numberBetween($min = 1, $max = 10), 
        'is_check' =>0,  
    ];
});
