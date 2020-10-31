import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import PaginationContainer from '../containers/PaginationContainer';
import PostListContainer from '../containers/PostListContainer';

const PostListPage = () => { 
    return (
        <> 
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </>
    );
};

export default PostListPage;