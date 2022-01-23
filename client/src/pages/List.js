import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircleButton from '../components/common/CircleButton';
import PostList from '../components/postList/PostList';

function List({ isLogin, accessToken }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = () => {
    const options = {
      method: 'get',
      url: `https://dev.cokkiriserver.xyz/post`
    };

    axios(options)
      .then((res) => {
        setPostList(res.data.data);
        console.log(res.data.data);
      })
      .catch();
  };

  console.log(postList);

  return (
    <main>
      <PostList posts={postList}></PostList>
      {isLogin && (
        <Link to='/add'>
          <CircleButton>+</CircleButton>
        </Link>
      )}
    </main>
  );
}

export default List;
