import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, loginThunk } from '../modules/auth';
import Authform from '../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { checkUserThunk } from '../modules/user';

const LoginFormContainer = ({ history }) => {
    const [error, setError] = useState('');
    const { login: form, auth } = useSelector((state) => state.auth);
    const { data: user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(changeField({
            formType: 'login',
            key: name,
            value,
        }))
    }
    const onSubmit = (e) => {
        const { username, password } = form;
        e.preventDefault();
        dispatch(loginThunk({ username, password }));
    }

    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch]);

    useEffect(() => {
        if (auth.error) {
            console.log('오류 발생');
            console.log(auth.error);
            setError(auth.error.response.data);
            return;
        }
        if (auth.data) {
            console.log('로그인 성공');
            console.log(auth.data);
            dispatch(checkUserThunk());
        }
    }, [auth.data, auth.error, dispatch]);

    useEffect(() => {
        if (user) {
            console.log('CHECK API 성공');
            console.log(user);
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);
    return (
        <Authform type='login' form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    );
};

export default withRouter(LoginFormContainer);