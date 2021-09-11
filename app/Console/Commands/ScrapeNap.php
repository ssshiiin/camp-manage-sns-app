<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Nap_url;
use App\Nap_info;

class ScrapeNap extends Command
{
    const HOST = 'https://www.nap-camp.com';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:nap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape Nap';

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
        $this->saveInfo();

    }

    private function saveInfo(){
        foreach (Nap_url::all() as $napUrl){
            $url = $this::HOST . $napUrl->url;

            $crawler = \Goutte::request('GET', $url);
            
            $basic_info = $this->getCampNameAndAddress($crawler);
            $camp_name = $basic_info[0];
            $address = $basic_info[1];

            $sales_info = $this->getCheckInAndCheckOut($crawler);
            $checkIn = $sales_info[2];
            $checkOut = $sales_info[3];

            Nap_info::create([
                'camp_name' => $camp_name,
                'address' => $address,
                'check_in' => $checkIn,
                'check_out' => $checkOut,
            ]);
            break;
            sleep(60);
        }
    }

    private function getCampNameAndAddress($crawler){
        return $crawler->filter('.g-container.info.basic .info-table .info-td')->each(function($node){
            return $node->text();
        });
    }

    private function getCheckInAndCheckOut($crawler){
        return $crawler->filter('.g-container.info.sales .info-table .info-td')->each(function($node){
            return $node->text();
        });
    }

    private function truncateTables()
    {
        DB::table('nap_urls')->truncate();
    }

    private function saveUrls()
    {
        foreach(range(1, 1) as $page){
            dump($page);
            $url = $this::HOST . '/list?sortId=21&pageId=' . $page;
    
            $crawler = \Goutte::request('GET', $url);
            $urls = $crawler->filter('.campsite-item')->each(function($node){
                return [
                    'url' => $node->attr('href'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            DB::table('nap_urls')->insert($urls);

            sleep(60);
        }

    }
}
