import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../components/write/TagBox';
import { changeField } from '../modules/write';

const TagBoxContainer = () => {
    const { tagList } = useSelector(state => state.write);
    const dispatch = useDispatch();
    const onChangeTagList = (nextTagList) => {
        dispatch(changeField({ key: 'tagList', value: nextTagList }));
    }
    return (
        <TagBox tagList={tagList} onChangeTagList={onChangeTagList} />
    );
};

export default TagBoxContainer;