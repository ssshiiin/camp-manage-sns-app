<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\GetUserGearsResource;

use App\Models\Gear;

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
            'gears' => GetUserGearsResource::collection(Gear::where("user_id", $this->user_id)->where("category", $this->category)->orderBy("created_at", "DESC")->get()),
        ];
    }
}
