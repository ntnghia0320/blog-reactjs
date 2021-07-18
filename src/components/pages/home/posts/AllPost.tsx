import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import postService from "../../../../services/post.service";

interface ParamTypes {
    categoryId?: string
}

const AllPost = () => {
    const params = useParams<ParamTypes>();
    const postDefault: Post[] = [];

    const [posts, setPosts] = useState(postDefault);
  
    useEffect(() => {
        postService.getAllPost().then(
            (res) => {
                setPosts(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('get all post');   
    }, [params.categoryId]);

    return (
        <ul>
            <li>Post List</li>
            {
                posts.map(post => 
                    <li key={post.id}>
                        <p >{post.title}</p>
                        <NavLink to={`/post/${post.id}`}>View</NavLink>
                    </li>
                )
            }
        </ul>
    );
};

export default AllPost;