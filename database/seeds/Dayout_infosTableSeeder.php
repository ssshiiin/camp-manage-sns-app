<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Dayout_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'dayout_infos';
        $this->filename = base_path().'/storage/app/dayout_infos.csv';
    }

    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
