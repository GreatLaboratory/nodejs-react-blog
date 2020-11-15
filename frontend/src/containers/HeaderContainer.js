import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/base/Header';
import { logoutUserThunk } from '../modules/user';

const HeaderContainer = () => {
    const {data: user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logoutUserThunk());
    }
    return (
        <Header user={user} onLogout={onLogout} />
    );
};

export default HeaderContainer;