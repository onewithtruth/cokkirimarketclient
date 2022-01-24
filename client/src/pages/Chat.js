import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Chat = () => {
  return <main>채팅페이지 입니다</main>;
};

export default Chat;

function List({ isLogin, accessToken }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = () => {
    const options = {
      method: 'get',
      url: `https://api.cokkirimarket.xyz/post`
    };

    axios(options)
      .then((res) => {
        setPostList(res.data.data);
        console.log(res.data.data);
      })
      .catch();
  };

  console.log(postList);

  return <main></main>;
}
