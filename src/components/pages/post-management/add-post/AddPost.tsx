import React, { useEffect, useState } from "react";
import categoryService from "../../../../services/category.service";
import postService from "../../../../services/post.service";
import AddTag from "./add-tags/AddTag";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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

const AddPost = () => {
    const classes = useStyles();
    const postDefault: Post = {} as Post;
    const categoriesDefalut: Category[] = [];
    const tagsDefault: Tag[] = [];
    const [openFail, setOpenFail] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
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
                setOpenFail(true);
                setErrorMessage(error.message);
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
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        post.createAt = dateTime;
        post.tags = tags;

        postService.postPosts(post, categoryId).then(
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
        setIdCategory(Number(event.target.value));
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
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Link image"
                        name="linkImage"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-multiline-static"
                        name="content"
                        label="Content"
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
                <button type='submit'>Add Post</button>
            </div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Add post success
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

export default AddPost;