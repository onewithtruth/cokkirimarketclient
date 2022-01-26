import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &.noResult {
    margin: 2rem 1rem;
  }
`;

function Indicator(props) {
  return (
    <Wrapper className={props.noResult && 'noResult'}>{props.children}</Wrapper>
  );
}

export default Indicator;
