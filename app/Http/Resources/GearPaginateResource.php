<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GearPaginateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $category = $request->query->get("category");
        return [
            "gears" =>GearProfileResource::collection($this->whereUser_idAndWhereCategoryPaginate($this->user_id, $category)),
        ];
    }
}
