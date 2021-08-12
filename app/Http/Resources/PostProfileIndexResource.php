<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostProfileIndexResource extends JsonResource
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
            'content' => $this->content, 
            'image_path' => $this->image_path, 
            'place' => $this->place, 
            'day' => $this->day, 
            'tags' => $this->tags,
        ];
    }
}
