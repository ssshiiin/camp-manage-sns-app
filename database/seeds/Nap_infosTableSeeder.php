<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Nap_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'nap_infos';

        $s3_file = Storage::disk('s3')->get(env('NAP_CSV_PATH'));

        $path = Storage::put("nap_infos.csv", $s3_file);

        $this->filename = storage_path('app/nap_infos.csv');
    }
    
    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
