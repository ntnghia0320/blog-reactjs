import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import postService from "../../../../services/post.service";

interface ParamTypes {
    categoryId?: string
}

const PostListOrderByCategory = () => {
    const params = useParams<ParamTypes>();
    const postsDefault: Post[] = [];

    const [posts, setPosts] = useState(postsDefault);
  
    useEffect(() => {
        postService.getPostsByCategoryId(Number(params.categoryId)).then(
            (res) => {
                setPosts(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('post list by category');   
    }, [params.categoryId]);

    return (
        <ul>
            <li>Post List</li>
            {
                posts.map(post => 
                    <li key={post.id}>
                        <p >{post.title}</p>
                        <NavLink to={`/post/${post.id}`}>edit</NavLink>
                    </li>
                )
            }
        </ul>
    );
};

export default PostListOrderByCategory;