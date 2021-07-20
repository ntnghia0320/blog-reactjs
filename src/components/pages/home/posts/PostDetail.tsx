import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../../../services/post.service";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider } from "@material-ui/core";

interface ParamTypes {
    postId?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            flexGrow: 1,
            padding: theme.spacing(3),
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            textAlign: 'center'
        },
        content: {
            fontSize: 18,
            textAlign: 'left'
        },
        createAt: {
            left: 0,
        },
        userName: {
            fontSize: 25
        },
        image: {
            maxWidth: '100%'
        },
        tags: {
            display: 'inline'
        },
        tag: {
            display: 'inline',
            marginLeft: 4,
            border: '1px solid grey',
            borderRadius: 4,
            padding: 3,
            backgroundColor: '#f2f2f2'
        }
    }),
);

export default function PostDetail() {
    const classes = useStyles();
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
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                    <Paper className={classes.paper}>
                        <h1>{post.title}</h1>
                        <br />
                        <img className={classes.image} src={post.linkImage} alt="" />
                        <br />
                        <p className={classes.content}>{post.content}</p>
                        <br />
                        <p className={classes.createAt}>{'Create at: ' + post.createAt}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper className={classes.paper}>
                        <p className={classes.userName}>
                            {`Author: ${post.user?.firstName} ${post.user?.lastName}`}
                        </p>
                        {post.user?.email}
                        <br />
                        <h2>Tags</h2>
                        <Divider />
                        <br />
                        <div className={classes.tags}>
                            {post.tags && post.tags.map(tag => (
                                <div className={classes.tag}>{tag.name}</div>
                            ))}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
