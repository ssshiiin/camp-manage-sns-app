<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\BringGearsResource;

class BringGearsCategoriesResource extends JsonResource
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
            "category"=>$this->first()->category,
            "gear_list"=>BringGearsResource::collection($this->all()),
            "count_true"=>$this->where("is_check", true)->count(),
            "count_all"=>$this->count(),
        ];
    }
}
