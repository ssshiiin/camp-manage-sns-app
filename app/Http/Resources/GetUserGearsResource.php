<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GetUserGearsResource extends JsonResource
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
            'id' => $this->id, 
            'user_id' => $this->user_id, 
            'category' => $this->category, 
            'gear_name' => $this->gear_name, 
            'brand' => $this->brand, 
            'purchased_day' => $this->purchased_day, 
            'price' => $this->price, 
            'amount' => $this->amount, 
            'gear_images' => $this->gearImages, 
        ];
    }
}
