<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Dayout_url;
use App\Models\Dayout_info;

class ScrapeDayOut extends Command
{
    const HOST = 'https://dayout.today';
    const FILE_PATH = 'app/dayout_infos.csv';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:dayout';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape Dayout';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->truncateTables();
        $this->saveUrls();
        $this->saveInfos();
        $this->exportCsv();
    }

    private function saveInfos(){
        foreach (Dayout_url::all() as $dayOutUrl){
            $url = $this::HOST . $dayOutUrl->url;

            $crawler = \Goutte::request('GET', $url);
            
            $camp_name = $this->getCampName($crawler);
            $tel = $this->getTel($crawler);
            $home_page = $this->getHomePage($crawler);

            if(empty($camp_name)){
                $camp_name = [""];
            }
            if(empty($tel)){
                $tel = [""];
            }
            if(empty($home_page)){
                $home_page = [""];
            }


            dump($camp_name);

            Dayout_info::create([
                'camp_name' => $camp_name[0],
                'tel' => $tel[0],
                'home_page' => $home_page[0],
            ]);

            sleep(60);
        }
    }

    private function getCampName($crawler){
        return $crawler->filter('.select_info_txt')->each(function($node){
            return $node->text();
        });
    }

    private function getTel($crawler){
        return $crawler->filter('.tel.campsite_data .data_content')->each(function($node){
            return $node->text();
        });
    }

    private function getHomePage($crawler){
        return $crawler->filter('.campsite_url.campsite_data .data_content')->each(function($node){
            return $node->text();
        });
    }

    private function truncateTables()
    {
        DB::table('dayout_urls')->truncate();
        DB::table('dayout_infos')->truncate();
    }

    private function saveUrls(){
        foreach (range(1, 170) as $page){
            dump($page);
            $url = $this::HOST . '/campsites?page=' . $page;

            $crawler = \Goutte::request('GET', $url);

            $urls = $crawler->filter('.campsite')->each(function($node){
                return [
                    'url' => $node->attr('href'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });


            DB::table('dayout_urls')->insert($urls);

            sleep(60);
        }
    }

    private function exportCsv(){
        $file = fopen(storage_path($this::FILE_PATH), "w");

        fputcsv($file, ["camp_app", "tel", "home_page"]);

        foreach(dayout_info::all() as $info){
            fputcsv($file, [$info->camp_name, $info->tel, $info->home_page]);
        }
    }
}
