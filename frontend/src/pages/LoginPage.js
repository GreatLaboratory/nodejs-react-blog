import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate'
import LoginFormContainer from '../containers/LoginFormContainer';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
    return (
        <>
            <Helmet><title>로그인 - GreatLaboratory</title></Helmet>
            <AuthTemplate>
                <LoginFormContainer />
            </AuthTemplate>
        </>
    );
};

export default LoginPage;