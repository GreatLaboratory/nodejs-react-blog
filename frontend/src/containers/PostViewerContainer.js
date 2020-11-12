import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPostThunk, unloadPost } from '../modules/post';
import PostViewer from '../components/post/PostViewer';
import PostActionButtons from '../components/post/PostActionButtons';
import { setOriginalPost } from '../modules/write';
import { removePost } from '../lib/api/post';

const PostViewerContainer = ({ match, history }) => {
    const { postId } = match.params;

    const { loading, data: post, error } = useSelector(state => state.post);
    const { data: user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readPostThunk(postId));
        return () => {
            dispatch(unloadPost());
        }
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write');
    }
    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const ownPost = (user && user._id) === (post && post.user._id)

    return <PostViewer post={post} loading={loading} error={error} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>} />;
};

export default withRouter(PostViewerContainer);