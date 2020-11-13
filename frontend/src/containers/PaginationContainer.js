import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import Pagination from '../components/post/Pagination';
import { withRouter } from 'react-router-dom';

const PaginationContainer = ({ location, match }) => {
    const { loading, data: postList, lastPage } = useSelector(state => state.postList);
    if (!postList && loading) return null;
    const { username } = match.params;
    const { tag, page=1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    })
    
    return (
        <Pagination tag={tag} username={username} page={parseInt(page)} lastPage={lastPage}/>
    );
};

export default withRouter(PaginationContainer);