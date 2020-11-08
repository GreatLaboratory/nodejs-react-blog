import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;
    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]};
    input,
    button {
        outline: none;
        border: none;
        font-size: 1rem;
    }
    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
    display: flex;
    margin-top: 0.5rem;
    color: red;
`;

const TagItem = React.memo(({ tag, onRemove }) => <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>);

const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock> 
        {tags.map(tag => (
            <TagItem onRemove={onRemove} key={tag} tag={tag}/>
        ))}
    </TagListBlock>
));

const TagBox = ({ tagList, onChangeTagList }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const onChange = useCallback((e) => {
        setInput(e.target.value);
    }, []);

    const onRemove = useCallback((tag) => {
        onChangeTagList(tagList.filter(thisTag => thisTag !== tag));
    }, [tagList, onChangeTagList]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!input) {
            setError('태그를 입력 후 추가해주세요.');
            return;
        }
        if (tagList.includes(input.trim())) {
            setError('이미 등록된 태그입니다. 다른 태그를 입력해주세요.');
            return;
        }
        onChangeTagList([...tagList, input.trim()]);
        setInput('');
        setError('');
    }, [input, tagList, onChangeTagList]);

    // useEffect(() => {
    //     onChangeTagList(tagList)
    // }, [tagList]);
    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input value={input} onChange={onChange} placeholder='태그를 입력하세요.'/>
                <button type='submit'>추가</button>
            </TagForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <TagList tags={tagList} onRemove={onRemove}/>
        </TagBoxBlock>
    );
};

export default TagBox;