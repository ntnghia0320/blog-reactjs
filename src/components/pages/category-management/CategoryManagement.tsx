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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import categoryService from '../../../services/category.service';
import AddCategory from './add-category/AddCategory';
import EditCategoryDetail from './edit-category/EditCategoryDetail';

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
          width: '30%',
          height: '30%',
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #333333',
          borderRadius: 8,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function CategoryManagement() {
  const classes = useStyles();
  const [isModalAddPostOpen, setIsModalAddPostOpen] = React.useState(false);
  const [isModalEditPostOpen, setIsModalEditPostOpen] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(-1);
  const postDefault: Category[] = [];
  const [categories, setCategories] = useState(postDefault);

    useEffect(() => {
        categoryService.getCategories().then(
            (res) => {
                setCategories(res);
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

  const openModalEditPost = (categoryId: number) => {
    setCategoryId(categoryId);
    setIsModalEditPostOpen(true);
  };

  const closeModalEditPost = () => {
    setIsModalEditPostOpen(false);
  };

  return (
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Edit <span>&emsp;</span></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {categories.map((categoty) => (
                <StyledTableRow key={categoty.id}>
                <StyledTableCell component="th" scope="row">{categoty.name}</StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => openModalEditPost(Number(categoty.id))}
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <div>
          <IconButton onClick={openModalAddPost}>
              <Fab color="primary" className={classes.absolute}>
                  <AddIcon />
              </Fab>
          </IconButton>
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
            <AddCategory />                                                     
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
            <EditCategoryDetail categoryId={categoryId} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
