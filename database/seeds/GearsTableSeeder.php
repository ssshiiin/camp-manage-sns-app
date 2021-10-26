<?php

use Illuminate\Database\Seeder;

class GearsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Gear::class, 200)->create();
    }
}
