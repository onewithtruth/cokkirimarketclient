import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/postList/PostList';
import SearchForm from '../components/SearchForm';
import { validationCheckAPI } from '../api';

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
      url: `https://dev.cokkiriserver.xyz/search`,
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
      url: `https://dev.cokkiriserver.xyz/search`,
      data: {
        payload: {
          query: postForm.word,
          category_id: postForm.category
        }
      }
    };

    console.log(options);

    axios(options)
      .then((res) => {
        setPostList(res.data.data);
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
      <PostList posts={postList}></PostList>
    </main>
  );
}

export default Search;
