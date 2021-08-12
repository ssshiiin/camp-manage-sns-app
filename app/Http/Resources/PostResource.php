<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'content' => $this->content, 
            'image_path' => $this->image_path, 
            'place' => $this->place, 
            'day' => $this->day, 
            'tags' => $this->tags,
            'created_at' => $this->created_at->format("Y/m/d")
        ];
    }
}
