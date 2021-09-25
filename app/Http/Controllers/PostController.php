<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GetPostsResource;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Storage;
use App\File;
use App\Models\Post;
use App\Models\User;
use App\Models\Gear;

class PostController extends Controller
{
    // タイムライン一覧表示
    public function indexHome()
    {   
        $posts = new Post;
        return $posts->getTimeLinePosts();
    }
    
    //プロフィール一覧表示
    public function indexProfile(User $user)
    {
        $user_id = $user->id;

        $posts = new Post;
        $gears = new Gear;

        $posts_profile = $posts->getUserPosts($user_id);
        $posts_count = $posts->getCountPost($user_id);

        $gears_profile = $gears->getUserCategory($user_id);
        $gears_count = $gears->getCountGear($user_id);

        return [
            "posts_profile" => $posts_profile,
            "posts_count" => $posts_count,
            "gears_profile" => $gears_profile,
            "gears_count" => $gears_profile,
        ];
    }
    
    //postsの詳細を取得する
    public function show(Post $post)
    {
        $post_id = $post->id;
        $post = Post::where("id", $post_id)->get();
    
        return GetPostsResource::collection($post);
    }

    // キャンプサイトの検索結果を取得
    public function getPlacePosts(Request $request){
        $place = $request->place;

        return Post::with("Post_images")->where('place', 'like', "%$place%")->orderBy('day', 'DESC')->take(21)->get();
    }
    
    //postsとpost_imagesを作成し、画像はs3に保存する
    public function create(CreatePostRequest $request, User $user){
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
        
        return $this->getUserPosts(User::find($user_id));
    }

    
    public function update(UpdatePostRequest $request, Post $post){
        $user_id = $post->user_id;
        $post_id = $post->id;
        
        $fileImage = $request->files;
        $content = $request->input("content");
        $place = $request->input("place");
        $day = $request->input("day");

        ///画像の変更があったか
        if (empty($fileImage)){
            Post_image::where("post_id", $post_id)->delete();
            foreach ($fileImage as $key => $value){
                $path = Storage::disk('s3')->putFile('/Post_images', $request->file("img"), 'public');
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
        
        return $this->getShowPost(Post::find($post_id));
    }
    
    public function destroy(Post $post){
        Post_image::where("post_id", $post->id)->delete();
        $post->delete();
        return;
    }
}

