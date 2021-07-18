import React, { useState } from "react";
import authService from "../../../services/auth.service";
import history from "../../../helpers/history";

const Login = () => {
    const initialState = {
        email: "",
        password: ""
    };

    const [state, setState] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authService.login(state).then(
            (res) => {
                history.push('/home');
                window.location.reload();
            },
            (error) => {
                alert(error.response.data.message);
              })
    };

    return (
        <form onSubmit={onSubmit}>
        <div>
            <input
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                onChange={onChange}
                required
            />

            <input
                name='password'
                id='password'
                type='password'
                placeholder='Password'
                onChange={onChange}
                required
            />
            <button type='submit'>Login</button>
        </div>
        </form>
    );
};

export default Login;