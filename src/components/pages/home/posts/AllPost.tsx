import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostCard from './PostCard';
import postService from '../../../../services/post.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      height: 400,
      display: 'inline',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function AllPost() {
  const classes = useStyles();
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
  }, []);

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
