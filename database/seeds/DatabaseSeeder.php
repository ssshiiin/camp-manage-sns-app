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
        // $this->call(UsersTableSeeder::class);
        // $this->call(ProfilesTableSeeder::class);
        // $this->call(PostsTableSeeder::class);
        // $this->call(GearsTableSeeder::class);
        // $this->call(Nap_infosTableSeeder::class);
        // $this->call(Dayout_infosTableSeeder::class);
        // $this->call(Save_gearsTableSeeder::class);
        // $this->call(Gear_imagesTableSeeder::class);
        $this->call(Post_imagesTableSeeder::class);
        
        
        // $this->call(TagsTableSeeder::class);
        // $this->call(Bring_gearsTableSeeder::class);
    }
}
