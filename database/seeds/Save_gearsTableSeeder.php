<?php

use Illuminate\Database\Seeder;

class Save_gearsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Save_gear::class, 200)->create();
    }
}
