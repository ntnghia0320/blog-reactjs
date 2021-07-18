import React, { useEffect, useState } from "react";
import categoryService from "../../../../services/category.service";
import postService from "../../../../services/post.service";
import AddTag from "./add-tags/AddTag";

const AddPost = () => {
    const postDefault: Post = {} as Post;
    const categoriesDefalut: Category[] = [];
    const tagsDefault: Tag[] = [];

    const [post, setPost] = useState(postDefault);
    const [categoryId, setIdCategory] = useState(-1);
    const [categories, setCategories] = useState(categoriesDefalut);
    const [tags, setTags] = useState(tagsDefault);
  
    useEffect(() => {
        categoryService.getCategories().then(
            (res) => {
                setCategories(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('add post');
        
    }, []);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;

        post.createAt = dateTime;
        post.tags = tags;
        // alert(JSON.stringify(post)+idCategory+idUser);
        
        postService.postPosts(post, categoryId).then(
            (response) => {
                // history.push("/home");
                alert(JSON.stringify(response));
            },
            (error) => {
                alert(error.response.data.message);
            }
        );
    };

    const handleChoiceChange = (idCategoryChosen: number) => {
        setIdCategory(idCategoryChosen);
    };

    const addTag: AddTag = (tag: Tag) => {
        setTags([...tags, tag]);
    };

    const deleteTag = (event: any, tagName: string)=>{
        event.preventDefault();
        setTags(tags.filter(tag => tag.name !== tagName))
    }

    return (
        <form onSubmit={onSubmit}>
        <div>
            <input
                name='title'
                id='title'
                type='text'
                placeholder='Title'
                onChange={onChange}
                required
            />

            <input
                name='content'
                id='content'
                type='text'
                placeholder='Content'
                onChange={onChange}
                required
            />

            <select defaultValue={-1} onChange={(event)=> handleChoiceChange(Number(event.currentTarget.value))}>
                <option value={-1}>Select category</option>
                {
                    categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
                }
            </select>

            <AddTag addTag={addTag}></AddTag>
            
            <ul>
                {
                    tags.map(tag => (
                        <li key={tag.name}>
                            <p >{tag.name}</p>
                            <a href={`/post-management/add-post/delete-tag`} onClick={(event) => deleteTag(event, tag.name)}>Delete</a>
                        </li>
                    ))
                }
            </ul>
            <button type='submit'>Add Post</button>
            </div>
        </form>
    );
};

export default AddPost;