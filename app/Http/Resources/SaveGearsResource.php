<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaveGearsResource extends JsonResource
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
            "id" => $this->id,
            "gear_id" =>$this->gear->id,  
            "gear_name" =>$this->gear->gear_name,
            "amount" =>$this->gear->amount,
            "is_check" => (bool) $this->is_check,
        ];
    }
}