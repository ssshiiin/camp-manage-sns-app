<?php

use Flynsarmy\CsvSeeder\CsvSeeder;

class Dayout_infosTableSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->table = 'dayout_infos';

        $s3_file = Storage::disk('s3')->get(env('DAYOUT_CSV_PATH'));

        $path = Storage::put("dayout_infos.csv", $s3_file);

        $this->filename = storage_path('app/dayout_infos.csv');
    }

    public function run()
    {
        DB::disableQueryLog();
        DB::table($this->table)->truncate();
        parent::run();
    }
}
