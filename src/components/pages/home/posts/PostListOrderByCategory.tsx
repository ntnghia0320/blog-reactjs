import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostCard from './PostCard';
import postService from '../../../../services/post.service';
import { useParams } from 'react-router-dom';

interface ParamTypes {
    categoryId?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      height: 400,
      display: 'inline',
      width: 'wrap',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface ParamTypes {
    categoryId?: string
}

const PostListOrderByCategory = () => {
    const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        {
            posts.map(post => (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper className={classes.paper}>
                        <PostCard post={post}/>
                    </Paper>
                </Grid>
            ))
        }
      </Grid>
    </div>
  );
}

export default PostListOrderByCategory;