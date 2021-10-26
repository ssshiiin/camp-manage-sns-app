<?php

use Illuminate\Database\Seeder;

class Bring_gearsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Bring_gear::class, 1)->create();
    }
}
