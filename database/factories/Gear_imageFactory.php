<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Gear_image;
use Faker\Generator as Faker;

$factory->define(Gear_image::class, function (Faker $faker) {
    return [
        "gear_id" => $faker->unique()->numberBetween(1, 400),
        "image_path" => $faker->randomElement(
            $array = [
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/7qlXlHDa7TazruVt6BZN4lZt2nTR6NervniYmbm7.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/B5arZntk119G0DdnsKqCCBsGO4eXFmXXaq6KtLeQ.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/BTEruVMBPq8EhqpV8sV8QzAPXuI2j34BK3m8CygF.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/BXkY7jWoyupc3ZBUDh8Dngc7a6qo3W1BSYzLEbHZ.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/cyUgFaa30JLBQUOVYdIAz5GHzcySFFU6bvps3vRK.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/FOfd5jZQ9WHdpgKVDLL79ZVQ02uAnP1nRO1KF7LW.jpg', 
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/O6enD5isv34nWCfSilXZ7W6fypEZHKWKNMudzXuU.jpg',
                'https://camp-manage-sns-app.s3.ap-northeast-1.amazonaws.com/Post_images/ojuRjGKMAIxJE4aK0JkypdZ5OLRn1nrD4rZldz4W.jpg',
                ]),
    ];
});
