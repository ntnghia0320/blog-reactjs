import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from "@material-ui/core/Divider";
import AddTag from '../add-post/add-tags/AddTag';
import React, { useEffect } from 'react';
import postService from '../../../../services/post.service';
import categoryService from '../../../../services/category.service';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        width: '90%',
        margin: 'auto',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
      },
      formControlCategory: {
        margin: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
                width: "35vw",
          },
        width: "10vw",  
      },
      formControlAddTag: {
        margin: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: "100vw",
      },
        width: "30vw",
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
      btnDeleteTag:{
          marginLeft: 4,
      },
      tagLi:{
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
      }
  }),
);

interface Props {
    postId: number;
  }

const EditPostDetail = (props: Props) => {
    const classes = useStyles();
    const postDefault: Post = {} as Post;
    const categoriesDefalut: Category[] = [];
    const tagsDefault: Tag[] = [];
    const categoryDefault: Category = {} as Category;
    const [openFail, setOpenFail] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [post, setPost] = React.useState(postDefault);
    const [category, setCategory] = React.useState(categoryDefault);
    const [categories, setCategories] = React.useState(categoriesDefalut);
    const [tags, setTags] = React.useState(tagsDefault);

    useEffect(() => {
        postService.getPostById(props.postId).then(
            (res) => {
                setPost(res);
                setTags(res.tags);
                setCategory(res.category);
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

    }, [props.postId]);

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

      
        postService.updatePost(post, props.postId).then(
            (response) => {
                setOpen(true);  
                window.setTimeout(function () { 
                    window.location.reload();
                }, 1000);
            },
            (error) => {
                setOpenFail(true);
                setErrorMessage(error.response.data.message);
            }
        );
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        categories.forEach(category => {
            if (category.id === Number(event.target.value)) {
                setCategory(category);
            }
        })
    };

    const addTag: AddTag = (tag: Tag) => {
        setTags([...tags, tag]);
    };

    const deleteTag = (tagName: string) => {
        setTags(tags.filter(tag => tag.name !== tagName))
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setOpenFail(false);
      };
    return (
<form className={classes.root} onSubmit={onSubmit}>
            <div>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Title"
                        name="title"
                        value={post.title}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Link image"
                        name="linkImage"
                        value={post.linkImage}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-multiline-static"
                        name="content"
                        label="Content"
                        value={post.content}
                        multiline
                        rows={15}
                        variant="outlined"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControlCategory}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    key={post.category?.id ? post.category?.id : 'none'}
                    defaultValue={post.category?.id ? post.category?.id : 'none'}
                    onChange={handleChange}
                    >
                    {
                        categories.map(category =><MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
                    }
                    </Select>
                </FormControl>
                <br />
                <FormControl className={classes.formControlAddTag}>
                    <AddTag addTag={addTag}></AddTag>
                </FormControl>
                <ul>
                    {tags.length ? <>
                                <h3>Tags</h3>
                                <Divider />
                                </>: <></>}
                    {
                        tags.map(tag => (
                            <li className={classes.tagLi} key={tag.name}>
                                <p >{tag.name}</p>
                                <IconButton
                                        className={classes.btnDeleteTag}
                                        aria-label="delete"
                                        onClick={() => deleteTag(tag.name)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                            </li>
                        ))
                    }
                </ul>
                <button type='submit'>Edit Post</button>
            </div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Edit post success
                </Alert>
            </Snackbar>

            <Snackbar open={openFail} autoHideDuration={8000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
        </form>
    );
};

export default EditPostDetail;