import React, { useState } from "react";
import authService from "../../../services/auth.service";

const Register = () => {
    const initialState: UserRegister = {} as UserRegister;

    const [userRegister, setUserRegister] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({ ...userRegister, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authService.register(userRegister).then(
            (response) => {
                // history.push("/home");
                alert(JSON.stringify(response));
            },
            (error) => {
                alert(error.response.data.message);
              });
    };

    return (
        <form onSubmit={onSubmit}>
        <div>
            <input
                name='firstName'
                id='firstName'
                type='text'
                placeholder='First Name'
                onChange={onChange}
                required
            />

            <input
                name='lastName'
                id='lastName'
                type='text'
                placeholder='Last Name'
                onChange={onChange}
                required
            />

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
            <button type='submit'>Register</button>
        </div>
        </form>
    );
};

export default Register;