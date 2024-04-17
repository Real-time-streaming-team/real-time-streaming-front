import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
    padding: 0.5rem 1.25rem;
    border-radius: 0.125rem;
    align-items: center;
    display: flex;
    ${props => props.subscribed ? css`
        border: 1.5px solid transparent;
        border-image-source: linear-gradient(180deg, #4ABEFF 0%, #001AFF 100%);
        border-image-slice: 1;
    ` : css`
        background: linear-gradient(153.5deg, #4ABEFF -63.68%, #001AFF 75.59%);
    `}
`;

const ButtonText = styled.div`
    display: flex;
    ${props => props.subscribed && css`
        background: linear-gradient(120deg, #4ABEFF 0%, #001AFF 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: bold;
    `}
`;

const StreamerButton = ({ subscribed, followHandler }) => {
    return (
        <Button onClick={followHandler} subscribed={subscribed}>
            <ButtonText subscribed={subscribed}>
                <div className='mr-1'>+</div>
                <div className=''>Follow</div>
            </ButtonText>
        </Button>
    )
}

export default StreamerButton
