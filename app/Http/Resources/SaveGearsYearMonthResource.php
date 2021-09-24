<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\GetUserGearsResource;
use Illuminate\Database\Eloquent\Builder;
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
                Gear::whereHas("save_gear", function (Builder $row) use ($user_id) {
                    $row->where("user_id", $user_id);
                })->with('save_gear')->get()->map(function ($row) use ($year_month, $user_id) {
                    if ($row->save_gear->where("user_id", $user_id)->first()->created_at->format('Y/m') == $year_month){
                        return $row;
                    }
                })->whereNotNull("id"))
        ];
    }
}
