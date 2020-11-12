import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { readPostListThunk } from '../modules/postList';

const PostListContainer = ({ location, match }) => {
    const { loading, data: postList, error } = useSelector(state => state.postList);
    const { data: user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    useEffect(() => {
        dispatch(readPostListThunk({ tag, username, page }));
    }, [dispatch, location.search, username]);

    return (
        <PostList loading={loading} error={error} postList={postList} showWriteButton={user} />
    );
};

export default withRouter(PostListContainer);