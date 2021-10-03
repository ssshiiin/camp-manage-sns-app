<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\GetUserGearsResource;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Gear;

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
                Gear::whereHas("saveGear", function (Builder $row) use ($user_id) {
                    $row->where("user_id", $user_id);
                })->with('saveGear')->get()->map(function ($row) use ($year_month, $user_id) {
                    if ($row->saveGear->where("user_id", $user_id)->first()->created_at->format('Y/m') == $year_month){
                        return $row;
                    }
                })->whereNotNull("id"))
        ];
    }
}
