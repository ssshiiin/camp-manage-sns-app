<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\GearProfileResource;
use App\Http\Resources\GearProfileCollection;
class GearCategoryResource extends JsonResource
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
            'category' => $this->category, 
            'gears' => GearProfileResource::collection($this->whereUser_idAndWhereCategory($this->user_id, $this->category)),
        ];
    }
}
