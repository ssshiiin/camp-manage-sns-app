<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GetPostsResource;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Storage;
use App\File;
use App\Models\Post;
use App\Models\PostImage;
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
    public function index(User $user)
    {
        $user_id = $user->id;

        $posts = new Post;
        $posts_profile = $posts->getUserPosts($user_id);

        $posts_count = $posts->getCountPost($user_id);
        
        return [
            "postsProfile" => $posts_profile,
            "countPosts" => $posts_count, 
        ];
    }
    
    //postsの詳細を取得する
    public function show(Post $post)
    {    
        return new GetPostsResource($post);
    }

    // キャンプサイトの検索結果を取得
    public function getPlacePosts(Request $request){
        $place = $request->place;

        return Post::with("Post_images")->where('place', 'like', "%$place%")->orderBy('day', 'DESC')->take(21)->get();
    }
    
    //postsとpost_imagesを作成し、画像はs3に保存する
    public function create(CreatePostRequest $request, User $user){
        try{
            $user_id = $user->id;
        
            $file_image = $request->file("img");
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
            $post_image = new PostImage;
        
            $path = Storage::disk('s3')->putFile('/Post_images', $file_image, 'public');

            if (empty($path)){
                throw new Exception("s3に保存できませんでした");
            } 
            PostImage::create([
                "post_id" => $post_id,
                "image_path" => Storage::disk('s3')->url($path),
            ]);
        } catch (Exception $es) {
            Post::delete($post);
        } finally {
            return $this->index(User::find($user_id));
        }
    }

    
    public function update(UpdatePostRequest $request, Post $post){
        try {
            $user_id = $post->user_id;
            $post_id = $post->id;
            
            $file_image = $request->file("img");
            $content = $request->input("content");
            $place = $request->input("place");
            $day = $request->input("day");
    
            ///画像の変更があったか
            if (!empty($file_image)){
                $path = Storage::disk('s3')->putFile('/Post_images', $file_image, 'public');
                if (empty($path)) {
                    throw new Exception("s3に保存できませんでした");
                }
                $post_image = PostImage::where("post_id", $post_id)->first();
                $post_image->image_path = Storage::disk('s3')->url($path);
                $post_image->update();

            }
            
            $post->content = $content;
            $post->day = $day;
            $post->place = $place;   
            $post->update();
        } finally {
            return $this->show(Post::find($post_id));
        }
        
    }
    
    public function destroy(Post $post){
        $user_id = $post->user_id;

        PostImage::where("post_id", $post->id)->delete();
        $post->delete();

        return $this->index(User::find($user_id));
    }
}

