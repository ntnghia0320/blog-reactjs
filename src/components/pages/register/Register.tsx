import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import authService from '../../../services/auth.service';
import history from "../../../helpers/history";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      maxWidth: '100%',
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    loginBtnOk: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
        color: '#333333',
        background: 'linear-gradient(45deg, #f8e7cd 30%, #e6d5c5 90%)',
    },
    header: {
      textAlign: 'center',
      background: 'linear-gradient(45deg, #f8e7cd 30%, #e6d5c5 90%)',
      color: '#333333'
    },
    card: {
      marginTop: theme.spacing(10)
    },
  })
);

//state type

type State = {
    firstName: string
    lastName: string
    email: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState:State = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setFirstName', payload: string }
    | { type: 'setLastName', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFirstName': 
    return {
        ...state,
        firstName: action.payload
    };
    case 'setLastName': 
        return {
            ...state,
            lastName: action.payload
        };
    case 'setEmail': 
        return {
            ...state,
            email: action.payload
        };
    case 'setPassword': 
        return {
            ...state,
            password: action.payload
        };
    case 'setIsButtonDisabled': 
        return {
            ...state,
            isButtonDisabled: action.payload
        };
    case 'loginSuccess': 
        return {
            ...state,
            helperText: action.payload,
            isError: false
        };
    case 'loginFailed': 
        return {
            ...state,
            helperText: action.payload,
            isError: true
        };
    case 'setIsError': 
        return {
            ...state,
            isError: action.payload
        };
  }
}

const Register = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openFail, setOpenFail] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    if (state.email.trim() && state.password.trim() && state.firstName.trim() && state.lastName.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
     setIsOk(true);
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
      setIsOk(false);
    }
  }, [state.email, state.password, state.firstName, state.lastName]);

  const handleRegister = () => {
    const userRegister = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password
    }
    
    authService.register(userRegister).then(
        (response) => {
            setOpen(true);
            window.setTimeout(function () { 
                history.push('/login');
                window.location.reload();
            }, 1000);
        },
        (error) => {
            setOpenFail(true);
            setErrorMessage(error.response.data.message)
        }
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    dispatch({
      type: 'setFirstName',
      payload: event.target.value
    });
  };

  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    dispatch({
      type: 'setLastName',
      payload: event.target.value
    });
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setEmail',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      setOpenFail(false);
    };

  return (
      <>
        <form className={classes.container} noValidate>
        <Card className={classes.card}>
            <CardHeader className={classes.header} title="Login App" />
            <CardContent>
            <div>
                <TextField
                    error={state.isError}
                    fullWidth
                    id="firstName"
                    type="text"
                    label="First name"
                    placeholder="First name"
                    margin="normal"
                    onChange={handleFirstNameChange}
                    onKeyPress={handleKeyPress}
                />
                <TextField
                    error={state.isError}
                    fullWidth
                    id="lastName"
                    type="text"
                    label="Last name"
                    placeholder="Last name"
                    margin="normal"
                    onChange={handleLastNameChange}
                    onKeyPress={handleKeyPress}
                />
                <TextField
                    error={state.isError}
                    fullWidth
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    onChange={handleEmailChange}
                    onKeyPress={handleKeyPress}
                />
                <TextField
                    error={state.isError}
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    helperText={state.helperText}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            </CardContent>
            <CardActions>
            <Button
                variant="contained"
                size="large"
                color="secondary"
                className={isOk ? classes.loginBtnOk : classes.loginBtn}
                onClick={handleRegister}
                disabled={state.isButtonDisabled}>
                Register
            </Button>
            </CardActions>
        </Card>
        </form>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Register success
            </Alert>
        </Snackbar>

        <Snackbar open={openFail} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;