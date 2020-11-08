import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../components/write/Editor';
import { changeField, initialize } from '../modules/write';

const EditorContainer = () => {
    const { title, body } = useSelector(state => state.write);
    const dispatch = useDispatch();
    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload))
    , [dispatch]);
    
    // 아래와 같이 useCallback을 사용하지않으면 title은 괜찮지만 body부분이 계속 렌더링되어 quill이 이상해진다.
    // 해당 함수가 계속 새로 만들어져서 그러하다.
    // const onChangeField = payload => dispatch(changeField(payload));
    
    useEffect(() => {
        // 아래처럼 써야 언마운트할 때 적용된다. return () => {...}이게 언마운트 시의 문법
        return () => {
            dispatch(initialize());
        }
    }, [dispatch]);
    return (
        <Editor onChangeField={onChangeField} title={title} body={body} />
    );
};

export default EditorContainer;