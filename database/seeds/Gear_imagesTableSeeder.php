<?php

use Illuminate\Database\Seeder;

class Gear_imagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Gear_image::class, 200)->create();
    }
}
