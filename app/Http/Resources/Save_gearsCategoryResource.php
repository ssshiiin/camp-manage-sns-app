<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Save_gearsResource;

class Save_gearsCategoryResource extends JsonResource
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
            "gearList"=>Save_gearsResource::collection($this->all()),
            "countTrue"=>$this->where("is_check", true)->count(),
            "countAll"=>$this->count(),
        ];
    }
}
