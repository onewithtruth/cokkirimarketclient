import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RoomList from '../components/roomList/RoomList';

const ChatRoomList = ({ userId, userInfo }) => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    chatListCallerforChatComponent();
  }, []);

  console.log('userId', userId);
  console.log('userInfo', userInfo);

  const chatListCallerforChatComponent = async () => {
    const payload = {
      user_id: userId
    };
  
    const options = {
      method: 'POST',
      url: 'https://api.cokkirimarket.xyz/socket/chatroomlist',
      headers: {
        Accept: 'application/json'
      },
      withCredentials: true,
      data: { payload }
    };

    await axios(options)
      .then((response) => {
        console.log(response.data.data.chatListInfoOutput);
        if (response.data.data.chatListInfoOutput)
          setRoomData(response.data.data.chatListInfoOutput);

        // let previousChatData = response.data;
        // setNickname(previousChatData.data.myNickname);
        // setChatListData(previousChatData.data.chatListInfo);
      })
      // .then(setShowChatList(!showChatList))
      .catch((err) => null);
  };

  // chatListCallerforChatComponent();

  return (
    <main>
      <RoomList roomData={roomData} userInfo={userInfo}></RoomList>
    </main>
  );
};

export default ChatRoomList;
