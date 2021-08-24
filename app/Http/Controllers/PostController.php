<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostProfileResource;
use App\Http\Resources\PostProfileIndexResource;
use Storage;
use App\File;
use App\Post;
use App\User;
use App\Post_image;


class PostController extends Controller
{
    //全ユーザーのpostsを取得
    public function getPosts(Request $request, Post $post)
    {
        $limit_count = $request->query->get("limit");
        
        return PostResource::collection($post->simplePaginate($limit_count));
    }
    
    //ユーザーのpostsを取得
    public function getPostsProfile(User $user, Post $post)
    {
        $user_id = $user->id;
        
        return PostProfileResource::collection($post->whereUser_idOrderByCreated_at($user_id));
    }
    
    public function getPostIndex(User $user, Post $post)
    {
        $user_id = $user->id;
        $post_id = $post->id;
        
        return PostProfileIndexResource::collection($post->whereUser_idAndPost_id($user_id, $post_id));
    }
    
    public function getCountPost(User $user){
        $user_id = $user->id;
        
        $count = Post::where("user_id", $user_id)->count();
        return $count;
    }
    
    //postsとpost_imagesを作成し、画像はs3に保存する
    public function createPost(Request $request, User $user){
        $user_id = $user->id;
    
        $fileImage = $request->files;
        $content = $request->input("content");
        $place = $request->input("place");
        $day = $request->input("day");
        
        
        //postsを作成し、作成したidをpost_idとして取得する
        $post = new Post;
        
        $input = [
            "user_id" => $user_id,
            "content" => $content,
            "place" => $place,
            "day" => $day,
        ];
        
        $post->fill($input)->save();
        $post_id = $post->id;
        
        
        //s3に画像を保存して、urlをpost_imagesに保存する
        $post_image = new Post_image;
    
        foreach ($fileImage as $key => $value){
            $path = Storage::disk('s3')->putFile('/Post_images', $request->file($key), 'public');
            Post_image::create([
                "post_id" => $post_id,
                "image_path" => Storage::disk('s3')->url($path),
            ]);
        }
    }
}
