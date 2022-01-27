import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &.search {
    margin: 2rem 1rem;
  }

  &.postForm {
    height: 100%;
  }
`;

function Indicator(props) {
  return <Wrapper className={props.type}>{props.children}</Wrapper>;
}

export default Indicator;
