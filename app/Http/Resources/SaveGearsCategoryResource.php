<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\SaveGearsResource;

class SaveGearsCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "category"=>$this->first()->gear->category,
            "gear_list"=>SaveGearsResource::collection($this->all()),
            "count_true"=>$this->where("is_check", true)->count(),
            "count_all"=>$this->count(),
        ];
    }
}
