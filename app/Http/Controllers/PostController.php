<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GetPostsResource;
use App\Http\Resources\PostProfileResource;
use App\Http\Resources\PostProfileIndexResource;
use Storage;
use App\File;
use App\Post;
use App\User;
use App\Post_image;
use App\Profile;


class PostController extends Controller
{
    //全ユーザーのpostsを取得
    public function getPosts(Request $request)
    {
        $posts = Post::orderBy("created_at", "DESC")->simplePaginate(5);
        
        //profilesのimage_pathを追加する
        return GetPostsResource::collection($posts);
    }
    
    //ユーザーのpostsを取得
    //post_imagesをリレーションする
    public function getUserPosts(User $user)
    {
        $user_id = $user->id;
        
        return Post::with("Post_images")->where('user_id', $user_id)->orderBy('created_at', 'DESC')->get();
        
        // return PostProfileResource::collection($post->whereUser_idOrderByCreated_at($user_id));
    }
    
    //postsの詳細を取得する
    public function getShowPost(Post $post)
    {
        $post_id = $post->id;
        $post = Post::where("id", $post_id)->get();
        //profilesのimage_pathを追加する
        return GetPostsResource::collection($post);
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
        
        return;
    }

    public function deletePost(Post $post){
        Post_image::where("post_id", $post->id)->delete();
        $post->delete();
        return;
    }

    public function updatePost(Request $request, Post $post){
        $user_id = $post->user_id;
        $post_id = $post->id;
    
        $fileImage = $request->files;
        $content = $request->input("content");
        $place = $request->input("place");
        $day = $request->input("day");

        ///プロフィール画像の変更があったか
        if (empty($fileImage)){
            Post_image::where("post_id", $post_id)->delete();
            foreach ($fileImage as $key => $value){
                $path = Storage::disk('s3')->putFile('/Post_images', $request->file($key), 'public');
                Post_image::create([
                    "post_id" => $post_id,
                    "image_path" => Storage::disk('s3')->url($path),
                ]);
            }
        }
        
        $post->content = $content;
        $post->day = $day;
        $post->place = $place;   
        $post->update();

        return;
    }
}

