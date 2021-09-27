<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Bring_gearsResource;

class Bring_gearsCategoriesResource extends JsonResource
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
            "gearList"=>Bring_gearsResource::collection($this->all()),
            "countTrue"=>$this->where("is_check", true)->count(),
            "countAll"=>$this->count(),
        ];
    }
}