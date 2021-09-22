<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\GetUserGearsResource;
use App\Gear;

class SaveGearsYearMonthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $year_month = $this->resource["year_month"];
        $user_id = $this->resource["user_id"];
        return [
            'year_month' => $year_month, 
            'gears' => GetUserGearsResource::collection(
                Gear::with("save_gear")->get()->
                where("save_gear.user_id", $user_id)->sortByDesc("save_gear.created_at")->
                map(function ($row) use ($year_month) {
                    if ($row->save_gear->created_at->format('Y/m') == $year_month){
                        return $row;
                    }
                })->whereNotNull("id"))
        ];
    }
}
