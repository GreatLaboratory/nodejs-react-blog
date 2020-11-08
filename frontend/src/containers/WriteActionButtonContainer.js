import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WriteActionButton from '../components/write/WriteActionButton';
import { updatePostThunk, writePostThunk } from '../modules/write';

const ErrorMessage = styled.div`
    display: flex;
    margin-top: 0.5rem;
    color: red;
`;

const WriteActionButtonContainer = ({ history }) => {
    const { title } = useSelector(state => state.write);
    const { body } = useSelector(state => state.write);
    const { tagList } = useSelector(state => state.write);
    const { originalPostId } = useSelector(state => state.write);
    const { loading, data: post, error } = useSelector(state => state.write.post);
    const dispatch = useDispatch();

    const onPublish = () => {
        if (originalPostId) {
            dispatch(updatePostThunk({ title, body, tagList, id: originalPostId}));
            return;
        }
        dispatch(writePostThunk({ title, body, tagList }));
    }

    const onCancel = () => {
        history.goBack();
    }

    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if (error) {
            console.log(error);
        }
    }, [dispatch, history, post, error]);

    return (
        <>
            <WriteActionButton onCancel={onCancel} onPublish={onPublish} isEdit={!!originalPostId}/>
            {error && <ErrorMessage>{error.data.details[0].message}</ErrorMessage>}
        </>
    );
};

export default withRouter(WriteActionButtonContainer);