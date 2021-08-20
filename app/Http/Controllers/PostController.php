<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostProfileResource;
use App\Http\Resources\PostProfileIndexResource;
use App\Post;
use App\User;

class PostController extends Controller
{
    public function getPosts(Request $request, Post $post)
    {
        $limit_count = $request->query->get("limit");
        
        return PostResource::collection($post->simplePaginate($limit_count));
    }
    
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
}
