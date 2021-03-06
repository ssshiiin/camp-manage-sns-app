<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Profile;

class GetPostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //プロフィールを設定していなかった場合はprofile_imageをnullとする
        try {
            $app_name = Profile::where("user_id", $this->user_id)->first()->app_name;
            $profile_image = Profile::where("user_id", $this->user_id)->first()->image_path;
        } catch(\Exception $e){
            $app_name = "";
            $profile_image = "";
        }
        return [
            'id' => $this->id, 
            'user_id' => $this->user_id, 
            'content' => $this->content, 
            'image_path' => $this->postImages,
            'place' => $this->place, 
            'day' => $this->day, 
            'nices' => $this->nices,
            'app_name' => $app_name,
            'profile_image' => $profile_image,
        ];
    }
}
