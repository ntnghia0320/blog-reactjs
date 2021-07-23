import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import postService from '../../../services/post.service';
import { NavLink } from 'react-router-dom';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#333333',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      wordWrap: 'break-word'
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 700,
        },
    }),
);

export default function VerifyPost() {
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

        console.log('veryfy post');   
    }, []);

    const activePost = (post: Post, postId: number) =>{
        post.active = !post.active;
        postService.updatePost(post, postId).then(
            (res) => {
                // alert(JSON.stringify(res.active));
                window.location.reload();
            },
            (error) => {
                alert(error.message)
            }
        );
    }
  return (
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Active<span>&emsp;</span></StyledTableCell>
                <StyledTableCell align="right">View <span>&emsp;</span></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {posts.map((post) => (
                <StyledTableRow key={post.id}>
                <StyledTableCell component="th" scope="row">{post.title}</StyledTableCell>
                <StyledTableCell align="right">{post.active ? 'Active' : 'Not Active'}</StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => activePost(post, Number(post.id))}
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="View post">
                        <IconButton
                            aria-label="view-post"
                            component={NavLink}
                            to={`/post/${post.id}`}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <span>&emsp;</span>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}