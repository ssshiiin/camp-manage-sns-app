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
        factory(App\Models\PostImage::class, 100)->create();
    }
}
