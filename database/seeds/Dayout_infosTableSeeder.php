<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Dayout_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'dayout_infos';
        $this->filename = env('DAYOUT_CSV_PATH');
    }

    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
