import React from 'react';
import styled from 'styled-components';
import DropdownCategory from './common/DropdownCategory';
import Searchbar from './Searchbar';

const Wrapper = styled.form`
  margin-top: 4rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function SearchForm({ fillPostForm, submitPostForm, categoryList }) {
  const categories = [{ id: 0, category: '없음' }, ...categoryList];

  return (
    <Wrapper>
      <DropdownCategory
        width='35%'
        list={categories}
        fillPostForm={fillPostForm}
      ></DropdownCategory>
      <Searchbar
        fillPostForm={fillPostForm}
        submitPostForm={submitPostForm}
      ></Searchbar>
    </Wrapper>
  );
}

export default SearchForm;
