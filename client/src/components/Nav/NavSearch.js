import styled from "styled-components";

export const NavSearchContainer = styled.div`

`;

export const SearchTitle = styled.div`
  margin-top: 3px;
  color : #323232;
  font-family: Nanum Barun Gothic;
  font-size : 9px;
  font-weight: bold;
`;

export const SearchIcon = styled.img`
  color : #323232;
  height: 20px;
`;

const NavSearch = () => {
  return (
    <NavSearchContainer>
      <SearchIcon src="/icons/search.png" />
      <SearchTitle>검색</SearchTitle>
    </NavSearchContainer>
  );
};

export default NavSearch;