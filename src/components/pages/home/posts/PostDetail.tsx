import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../../../services/post.service";

interface ParamTypes {
    postId?: string
}

const PostDetail = () => {
    const params = useParams<ParamTypes>();
    const postDefault: Post = {} as Post;

    const [post, setPost] = useState(postDefault);
  
    useEffect(() => {
        postService.getPostById(Number(params.postId)).then(
            (res) => {
                setPost(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('post list by category');   
    }, [params.postId]);

    return (
        <>
            <h1>{post.title}</h1>
            <h2>{post.content}</h2>
            <h3>{post.user?.firstName}</h3>
        </>
    );
};

export default PostDetail;