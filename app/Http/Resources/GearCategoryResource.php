<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\GetUserGearsResource;

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
            'gears' => GetUserGearsResource::collection($this->whereUser_idAndWhereCategory($this->user_id, $this->category)),
        ];
    }
}
