<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Post;

class PostController extends Controller
{
    public function getPosts(Request $request, Post $post)
    {
        $limit_count = $request->query->get("limit");
        return PostResource::collection($post->simplePaginate($limit_count));
    }
}
