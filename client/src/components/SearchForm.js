import React from 'react';
import styled from 'styled-components';
import DropdownCategory from './common/DropdownCategory';
import Searchbar from './Searchbar';

const Wrapper = styled.form`
  margin-top: 4rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

function SearchForm({ fillPostForm, submitPostForm, categoryList }) {
  const categories = [{ id: 0, category: '없음' }, ...categoryList];

  return (
    <Wrapper>
      <DropdownCategory
        list={categories}
        fillPostForm={fillPostForm}
        small
      ></DropdownCategory>
      <Searchbar
        fillPostForm={fillPostForm}
        submitPostForm={submitPostForm}
      ></Searchbar>
    </Wrapper>
  );
}

export default SearchForm;
