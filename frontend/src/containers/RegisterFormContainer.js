import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, registerThunk } from '../modules/auth';
import Authform from '../components/auth/AuthForm';
import { checkUserThunk } from '../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterFormContainer = ({ history }) => {
    const [error, setError] = useState('');
    const { register: form, auth } = useSelector((state) => state.auth);
    const { data: user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(changeField({
            formType: 'register',
            key: name,
            value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({ formType: 'register', key: 'password', value: '' }));
            dispatch(changeField({ formType: 'register', key: 'passwordConfirm', value: '' }));
            return; 
        }
        dispatch(registerThunk({ username, password }));
    }

    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch]);
    
    useEffect(() => {
        if (auth.error) {
            if (auth.error.response.status === 400) {
                setError('아이디는 3-20자리의 문자열이어야 합니다.');
                return;
            }
            if (auth.error.response.status === 409) {
                setError('이미 가입된 회원입니다.');
                return;
            }
            setError('회원가입 실패');
            return;
        }
        if (auth.data) {
            console.log('회원가입 성공');
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
        <>
            {auth.loading && (<div>로딩중...</div>)}
            <Authform type='register' form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
        </>
    );
};

export default withRouter(RegisterFormContainer);