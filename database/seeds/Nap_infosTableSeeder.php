<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Nap_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'nap_infos';
        $this->filename = base_path().'/storage/app/nap_infos.csv';
    }

    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
