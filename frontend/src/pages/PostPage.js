import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import PostViewerContainer from '../containers/PostViewerContainer';
import { Helmet } from 'react-helmet-async';

const PostPage = () => {
    return (
        <>
            <Helmet><title>게시물 - GreatLaboratory</title></Helmet>
            <HeaderContainer/>
            <PostViewerContainer/>
        </>
    );
};

export default PostPage;