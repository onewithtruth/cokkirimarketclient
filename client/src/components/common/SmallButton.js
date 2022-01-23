import React from 'react';
import styled, { css } from 'styled-components';

const location = css`
  position: absolute;
  top: ${({ top }) => top && `${top}`};
  right: ${({ right }) => right && `${right}`};
  bottom: ${({ bottom }) => bottom && `${bottom}`};
  left: ${({ left }) => left && `${left}`};
`;

const Button = styled.button`
  ${location}
  height: 2.2rem;
  padding: 1.2rem 0.8rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.blue_light};
  border-radius: 5px;
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.grey2};
  background-color: ${({ theme }) => theme.colors.blue_base};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
`;

function SmallButton(props) {
  const { top, right, bottom, left } = props;

  return (
    <Button
      top={top || ''}
      right={right || ''}
      bottom={bottom || ''}
      left={left || ''}
      onClick={props.onClickHandler}
    >
      {props.children}
    </Button>
  );
}

export default SmallButton;
