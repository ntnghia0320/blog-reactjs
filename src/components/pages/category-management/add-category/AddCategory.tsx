import React, { useState } from "react";
import categoryService from "../../../../services/category.service";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        width: '90%',
        margin: 'auto',
        alignItems: 'center',
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
      },
      buton:{
        width: '30%'
      }
  }),
);

const AddCategory = () => {
    const classes = useStyles();
    const [openFail, setOpenFail] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [name, setName] = React.useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const category = { name: name};
        categoryService.postCategory(category).then(
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
                        label="Name"
                        name="name"
                        autoFocus
                        onChange={onChange}
                    />
                    <br />
                    <button className={classes.buton} type='submit'>Add Category</button>
                </FormControl>
            </div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Add category success
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

export default AddCategory;