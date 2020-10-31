import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate'
import RegisterFormContainer from '../containers/RegisterFormContainer';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
    return (
        <AuthTemplate>
            <Helmet><title>회원가입 - GreatLaboratory</title></Helmet>
            <RegisterFormContainer />
        </AuthTemplate>
    );
};

export default RegisterPage;