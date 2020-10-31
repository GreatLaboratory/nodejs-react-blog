import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/EditorContainer';
import HeaderContianer from '../containers/HeaderContainer';
import TagBoxContainer from '../containers/TagBoxContainer';
import WriteActionButtonContainer from '../containers/WriteActionButtonContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <>
            <Helmet><title>글 작성하기 - GreatLaboratory</title></Helmet>
            <HeaderContianer/>
            <Responsive>
                <EditorContainer/>
                <TagBoxContainer/>
                <WriteActionButtonContainer/>
            </Responsive>
        </>
    );
};

export default WritePage;