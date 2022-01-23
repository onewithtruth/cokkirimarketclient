import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { validationCheckAPI } from '../api';
import SmallButton from '../components/common/SmallButton';
import PostFormData from '../components/PostFormData';
import { useNavigate } from 'react-router-dom';

function Add({ accessToken }) {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    contents: '',
    price: '',
    category: '',
    image_src: ''
  });

  useEffect(() => {
    console.log(accessToken);
    getCategoryList();
  }, []);

  const submitPostForm = (e) => {
    e.preventDefault();
    if (!validationCheckAPI.checkPostFormValid(postForm)) {
      /* !제대로 폼 채우라는 모달창 띄우고 리턴! */
      console.log(postForm);
      console.log('try again');
      return;
    }
    console.log(postForm);
    postPostDataForm(postForm);
  };

  const postPostDataForm = (postForm) => {
    const options = {
      method: 'post',
      url: 'https://dev.cokkiriserver.xyz/post',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      data: postForm
    };

    axios(options)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch(console.log);
  };

  const getCategoryList = () => {
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

  const fillPostForm = (data) => {
    setPostForm(Object.assign(postForm, data));
  };

  return (
    <main>
      <form>
        <SmallButton right='0' onClickHandler={submitPostForm}>
          등 록
        </SmallButton>
        <PostFormData
          fillPostForm={fillPostForm}
          categoryList={categoryList}
        ></PostFormData>
      </form>
    </main>
  );
}

export default Add;
