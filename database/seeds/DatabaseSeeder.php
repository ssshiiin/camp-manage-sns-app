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
        //uniqueが原因でpost_imagesとprofilesは別で実行しないとエラーが出る
        // $this->call(UsersTableSeeder::class);
        // $this->call(PostsTableSeeder::class);
        // $this->call(Post_imagesTableSeeder::class);
        // $this->call(ProfilesTableSeeder::class);
        // $this->call(TagsTableSeeder::class);
        $this->call(GearsTableSeeder::class);
    }
}
