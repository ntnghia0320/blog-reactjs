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
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import AddPost from './add-post/AddPost';
import EditPostDetail from './edit-post/EditPostDetail';
import postService from '../../../services/post.service';
import { NavLink } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          width: '90%',
          height: '90%',
          overflow: 'scroll',
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #333333',
          borderRadius: 8,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function PostManagement() {
  const classes = useStyles();
  const [isModalAddPostOpen, setIsModalAddPostOpen] = React.useState(false);
  const [isModalEditPostOpen, setIsModalEditPostOpen] = React.useState(false);
  const [postId, setPostId] = React.useState(-1);
  const postDefault: Post[] = [];
  const [posts, setPosts] = useState(postDefault);
  const [openDialog, setOpenDialog] = React.useState(false);

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

  const openModalEditPost = (postId: number) => {
    setPostId(postId);
    setIsModalEditPostOpen(true);
  };

  const closeModalEditPost = () => {
    setIsModalEditPostOpen(false);
  };

  const deletePost = (postId: any) => {
    setPostId(postId);
    setOpenDialog(true);
}
const handleCloseDialog = () => {
  setOpenDialog(false);
}

const handleSure = () =>{
  postService.deletePost(postId).then(
    (res) => {
        window.location.reload();
    },
    (error) => {
        alert(error.message)
    }
);
  setOpenDialog(false);
}

const handleNotSure = () =>{
  setOpenDialog(false);
}

  return (
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Status </StyledTableCell>
                <StyledTableCell align="right">View <span>&emsp;</span></StyledTableCell>
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
                    <Tooltip title="View">
                        <IconButton
                            aria-label="view"
                            component={NavLink}
                            to={`/post/${post.id}`}
                        >
                          <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
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
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalAddPostOpen}
            onClose={closeModalAddPost}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalAddPostOpen}>
          <div className={classes.paper}>
            <AddPost />
          </div>
        </Fade>
      </Modal>
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalEditPostOpen}
            onClose={closeModalEditPost}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalEditPostOpen}>
          <div className={classes.paper}>
            <EditPostDetail postId={postId} />
          </div>
        </Fade>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotSure} color="primary">
            No
          </Button>
          <Button onClick={handleSure} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
