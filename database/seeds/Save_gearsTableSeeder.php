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
        factory(App\Models\SaveGear::class, 50)->create();
    }
}
