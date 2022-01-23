import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 4rem;
  height: 4rem;
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue_light};
  border-radius: 50%;
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.grey2};
  background-color: ${({ theme }) => theme.colors.blue_base};
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.5rem;
`;

function CircleButton(props) {
  return <Button onClick={props.onClickHandler}>{props.children}</Button>;
}

export default CircleButton;
