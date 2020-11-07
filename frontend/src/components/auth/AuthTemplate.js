import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import { Link } from 'react-router-dom'

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: ${palette.gray[2]};
    /* flex로 내부 중앙 정렬 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    width: 500px;
    background: white;
    border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className='logo-area'>
                    <Link to='/'>GreatLaboratory</Link>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;