<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(GearsTableSeeder::class);
        $this->call(Save_gearsTableSeeder::class);
        $this->call(TemplatesTableSeeder::class);
        $this->call(SchedulesTableSeeder::class);
    }
}
