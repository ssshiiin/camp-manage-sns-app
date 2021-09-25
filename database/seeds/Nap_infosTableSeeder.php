<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Nap_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'nap_infos';
        $this->filename = env('NAP_CSV_PATH');
    }

    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
