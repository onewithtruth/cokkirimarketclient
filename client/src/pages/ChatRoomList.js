import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatRoomList = () => {
  return <main>채팅페이지 입니다</main>;
};

export default ChatRoomList;

// function List({ isLogin, accessToken }) {
//   const [postList, setPostList] = useState([]);

//   useEffect(() => {
//     chatListCallerforChatComponent();
//   }, []);

//   const chatListCallerforChatComponent = async () => {
//     const payload = {
//       user_id: user_id
//     };

//     const options = {
//       method: 'POST',
//       url: 'http://localhost:80/socket/chatroomlist',
//       headers: {
//         Accept: 'application/json'
//       },
//       withCredentials: true,
//       data: { payload }
//     };

//     await axios(options)
//       .then((response) => {
//         let previousChatData = response.data;
//         setNickname(previousChatData.data.myNickname);
//         setChatListData(previousChatData.data.chatListInfo);
//       })
//       .then(setShowChatList(!showChatList))
//       .catch((err) => null);
//   };

//   console.log(postList);

//   return <main></main>;
// }
