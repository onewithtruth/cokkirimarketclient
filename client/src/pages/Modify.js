import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { validationCheckAPI } from '../api';
import SmallButton from '../components/common/SmallButton';
import PostFormData from '../components/PostFormData';
import { useLocation, useNavigate } from 'react-router-dom';

function Modify({ accessToken }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);
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
    getPostDetails();
  }, []);

  const getCategoryList = () => {
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

  const getPostDetails = () => {
    const options = {
      method: 'get',
      url: `https://api.cokkirimarket.xyz/post?id=${postId}`
    };

    axios(options)
      .then((res) => {
        const currentPost = res.data.data[0];
        console.log(currentPost);
        const { title, contents, price, image_src } = currentPost;
        setPostForm({ title, contents, price, image_src });
      })
      .catch();
  };

  const fillPostForm = (data) => {
    setPostForm(Object.assign(postForm, data));
  };

  const patchPostForm = (e) => {
    e.preventDefault();
    console.log('patch');
    console.log(postForm);
    const bodyPostForm = Object.assign({ id: postId }, postForm);
    const options = {
      method: 'patch',
      url: `https://api.cokkirimarket.xyz/post?id=${postId}`,
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      data: postForm
    };
    console.log(options);

    axios(options).then((res) => {
      console.log(res);
      navigate(`/list/${postId}`);
    });
  };

  return (
    <main>
      <form>
        <SmallButton right='0' onClickHandler={patchPostForm}>
          등 록
        </SmallButton>
        <PostFormData
          fillPostForm={fillPostForm}
          categoryList={categoryList}
          postForm={postForm}
        ></PostFormData>
      </form>
    </main>
  );
}

export default Modify;
