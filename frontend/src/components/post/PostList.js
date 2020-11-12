import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette'
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;

    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const SubInfo = styled(Link)`
    color: ${palette.gray[6]};
    
    span + span:before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const Tags = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            color: ${palette.cyan[6]};
        }
    }
`;


const PostItem = ({ post }) => {
    const { title, body, user, publishDate, tags, _id } = post;
    return (
        <PostItemBlock>
            <h2><Link to={`/@${user.username}/${_id}`}>{title}</Link></h2>
            <SubInfo to={`/@${user.username}`}>
                <span><b>{user.username}</b></span>
                <span>{new Date(publishDate).toLocaleDateString()}</span>
            </SubInfo>
            <Tags>
                {tags.map(tag => <Link to={`/?tag=${tag}`} key={tag} className='tag'>#{tag}</Link>)}
            </Tags>
            <p>{body}</p>
        </PostItemBlock>
    );
};

const PostList = ({ loading, error, postList, showWriteButton}) => {
    if (error) {
        return <PostListBlock>에러가 발생하였습니다.</PostListBlock>
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && <Button cyan to='write'>새 글 작성하기</Button>}
            </WritePostButtonWrapper>
            {!loading && postList && (
                <div>
                    {postList.map(post => <PostItem key={post._id} post={post}/>)}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;