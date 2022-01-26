import React from 'react';
import styled from 'styled-components';
import SmallButton from './common/SmallButton';

const SearchInput = styled.input`
  height: 2rem;
  width: 58%;
  outline: none;
  border: none;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.blue_dark};
  font-size: 1.2rem;
  transform: translateY(-25%);
  margin-left: 0.2rem;
`;

function Searchbar({ fillPostForm, submitPostForm }) {
  return (
    <>
      <SearchInput
        type='text'
        onChange={(e) => fillPostForm({ word: e.target.value })}
      />
      <SmallButton right='0px' top='0' onClickHandler={submitPostForm}>
        검색
      </SmallButton>
    </>
  );
}

export default Searchbar;
