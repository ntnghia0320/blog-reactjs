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
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
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

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openFail, setOpenFail] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
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
  }, [state.username, state.password]);

  const handleLogin = () => {
    const userLogin = {
        email: state.username,
        password: state.password
    }
    authService.login(userLogin).then(
        () => {
            setOpen(true);
            window.setTimeout(function () { 
                history.push('/home');
                window.location.reload();
            }, 1000);
        },
        (error) => {
            setOpenFail(true);
        })
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
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
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleUsernameChange}
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
                onClick={handleLogin}
                disabled={state.isButtonDisabled}>
                Login
            </Button>
            </CardActions>
        </Card>
        </form>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Login success
            </Alert>
        </Snackbar>

        <Snackbar open={openFail} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            Username or password incorrect
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;