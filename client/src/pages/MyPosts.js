import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/postList/PostList';

export const ErrorMsg = styled.div``;

const MyPosts = ({ accessToken }) => {
  const [myposts, setMyposts] = useState([]);

  const getPostList = () => {
    const options = {
      method: 'get',
      url: `https://dev.cokkiriserver.xyz/post/my`,
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };

    axios(options)
      .then((res) => {
        setMyposts(res.data.data);
      })
      .catch();
  };

  useEffect(() => {
    getPostList();
  }, []);
  console.log(myposts);

  return (
    <main>
      <PostList posts={myposts}></PostList>
    </main>
  );
};

export default MyPosts;
