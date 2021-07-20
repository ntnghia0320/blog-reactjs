import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryService from "../../../../services/category.service";
import postService from "../../../../services/post.service";
import AddTag from "../add-post/add-tags/AddTag";

interface ParamTypes {
    postId?: string
}

const EditPostDetail = () => {
    const postDefault: Post = {} as Post;
    const categoriesDefalut: Category[] = [];
    const tagsDefault: Tag[] = [];
    const categoryDefault: Category = {} as Category;
    const params = useParams<ParamTypes>();

    const [post, setPost] = useState(postDefault);
    const [category, setCategory] = useState(categoryDefault);
    const [categories, setCategories] = useState(categoriesDefalut);
    const [tags, setTags] = useState(tagsDefault);

    useEffect(() => {
        postService.getPostById(Number(params.postId)).then(
            (res) => {
                setPost(res);
                setTags(res.tags);
                console.log(res.category.id);
            },
            (error) => {
                alert(error.message)
            }
        );

        categoryService.getCategories().then(
            (res) => {
                setCategories(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('edit post detail');

    }, [params.postId]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        post.updateAt = dateTime;
        post.tags = tags;
        post.category = category;
        // alert(JSON.stringify(post)+categoryId);

        postService.updatePost(post, Number(params.postId)).then(
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
        categories.forEach(category => {
            if (category.id === idCategoryChosen) {
                setCategory(category);
            }
        })
    };

    const addTag: AddTag = (tag: Tag) => {
        setTags([...tags, tag]);
    };

    const deleteTag = (event: any, tagName: string) => {
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
                    value={post.title || ''}
                    onChange={onChange}
                    required
                />

                <input
                    name='content'
                    id='content'
                    type='text'
                    placeholder='Content'
                    value={post.content || ''}
                    onChange={onChange}
                    required
                />

                <input
                    name='linkImage'
                    id='linkImage'
                    type='text'
                    value={post.linkImage || ''}
                    placeholder='Link Image'
                    onChange={onChange}
                    required
                />

                <select defaultValue={-1} onChange={(event) => handleChoiceChange(Number(event.currentTarget.value))}>
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
                                <a href={`/post-management/edit-post-detail/${params.postId}/delete-tag`} onClick={(event) => deleteTag(event, tag.name)}>Delete</a>
                            </li>
                        ))
                    }
                </ul>

                <button type='submit'>Edit Post</button>

            </div>
        </form>
    );
};

export default EditPostDetail;