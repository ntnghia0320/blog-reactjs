import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal } from '@material-ui/core';
import AddPost from './add-post/AddPost';
import EditPostDetail from './edit-post/EditPostDetail';
import postService from '../../../services/post.service';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
        fab: {
            margin: theme.spacing(2),
        },
        absolute: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(1),
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function PostManagement() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [isModalAddPostOpen, setIsModalAddPostOpen] = React.useState(false);
  const [isModalEditPostOpen, setIsModalEditPostOpen] = React.useState(false);
  const [postId, setPostId] = React.useState(-1);
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

  const openModalAddPost = () => {
    setIsModalAddPostOpen(true);
  };

  const closeModalAddPost = () => {
    setIsModalAddPostOpen(false);
  };

  const bodyModalAddPost = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add new post</h2>
      <p id="simple-modal-description">
        Create your post!
      </p>
      <AddPost />
    </div>
  );

  const openModalEditPost = (postId: number) => {
    setPostId(postId);
    setIsModalEditPostOpen(true);
  };

  const closeModalEditPost = () => {
    setIsModalEditPostOpen(false);
  };

  const bodyModalEditPost = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit post</h2>
      <p id="simple-modal-description">
        Edit your post!
      </p>
      <EditPostDetail postId={postId} />
    </div>
  );

  const deletePost = (postId: any) => {
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
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Edit <span>&emsp;</span></StyledTableCell>
                <StyledTableCell align="right">Delete <span>&emsp;</span></StyledTableCell>
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
                            onClick={() => openModalEditPost(Number(post.id))}
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => deletePost(post.id)}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <span>&emsp;</span>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <div>
            <Tooltip title="Add" aria-label="add">
                <IconButton onClick={openModalAddPost}>
                    <Fab color="primary" className={classes.absolute}>
                        <AddIcon />
                    </Fab>
                </IconButton>
            </Tooltip>
        </div>

        <Modal
            open={isModalAddPostOpen}
            onClose={closeModalAddPost}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {bodyModalAddPost}
        </Modal>

        <Modal
            open={isModalEditPostOpen}
            onClose={closeModalEditPost}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {bodyModalEditPost}
        </Modal>
    </>
  );
}
