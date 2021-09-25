<?php

use Illuminate\Database\Seeder;

class Post_imagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Post_image::class, 100)->create();
    }
}
