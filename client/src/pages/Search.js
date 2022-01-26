import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/postList/PostList';
import SearchForm from '../components/SearchForm';
import { validationCheckAPI } from '../api';
import Indicator from '../components/common/Indicator';
import styled from 'styled-components';

function Search() {
  const [categoryList, setCategoryList] = useState([]);
  const [postForm, setPostForm] = useState({ category: 0, word: '' });
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const fillPostForm = (data) => {
    setPostForm(Object.assign(postForm, data));
  };

  const submitPostForm = (e) => {
    e.preventDefault();
    if (!validationCheckAPI.checkSearchFormValid(postForm)) {
      console.log('try again');
      return;
    }
    getSearchList();
  };

  const getCategoryList = () => {
    console.log('hi');
    const options = {
      method: 'get',
      url: `https://api.cokkirimarket.xyz/search`,
      data: {
        payload: {
          query: 'categoryList'
        }
      }
    };

    axios(options)
      .then((res) => {
        console.log(res.data.data);
        setCategoryList(res.data.data);
      })
      .catch(console.log);
  };

  const getSearchList = () => {
    const options = {
      method: 'post',
      url: `https://api.cokkirimarket.xyz/search`,
      data: {
        payload: {
          query: postForm.word,
          category_id: postForm.category
        }
      }
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.data);
        console.log(postList);
      })
      .catch();
  };

  return (
    <main>
      <SearchForm
        fillPostForm={fillPostForm}
        submitPostForm={submitPostForm}
        categoryList={categoryList}
      ></SearchForm>
      {postList.length > 0 ? (
        <PostList posts={postList}></PostList>
      ) : (
        <Indicator noResult>검색 결과가 없습니다!</Indicator>
      )}
    </main>
  );
}

const NoResultIndicator = styled(Indicator)`
  background-color: pink;
`;

export default Search;
