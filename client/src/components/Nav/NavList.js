import React from 'react';
import styled from "styled-components";


export const NavListContainer = styled.div`
  /* display: inline; */

`;

export const ListTitle = styled.div`
  margin-top: 3px;
  color : #323232;
  font-family: Nanum Barun Gothic;
  font-size : 9px;
  font-weight: bold;
`;

export const ListIcon = styled.img`
  color : #323232;
  height: 20px;
`;



const NavList = () => {
  return (
    <NavListContainer>
      <ListIcon src="/icons/list.png"/>

      <ListTitle>목록</ListTitle>
    </NavListContainer>
  );
};

export default NavList;