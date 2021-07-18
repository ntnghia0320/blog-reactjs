import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import postService from "../../../../services/post.service";

const EditPostList = () => {
    const postDefault: Post[] = [];

    const [posts, setPosts] = useState(postDefault);
  
    useEffect(() => {
        postService.getPostsByUserId().then(
            (res) => {
                setPosts(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('edit post list');   
    }, []);

    const deletePost = (event: any, postId: any) => {
        // alert("delete"+postId);
        event.preventDefault();
        postService.deletePost(postId).then(
            (res) => {
                window.location.reload();
            },
            (error) => {
                alert(error.message)
            }
        );
    }

    return (
        <ul>
            <li>Edit</li>
            {
                posts.map(post => 
                    <li key={post.id}>
                        <p >{post.title}</p>
                        <NavLink to={`/post-management/edit-post-detail/${post.id}`}>edit</NavLink>
                        <a href='/post-management/edit-post' onClick={(event) => deletePost(event, post.id)}>Delete</a>
                    </li>
                )
            }
        </ul>
    );
};

export default EditPostList;