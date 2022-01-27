import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const socket = io.connect('https://api.cokkirimarket.xyz');

function Chat({ userId, nickname }) {
  console.log('userId in chat.js', userId);
  console.log('nickname in chat.js', nickname);

  const { pathname, hash, state } = useLocation();
  const postId = pathname.split('/')[2];
  const room = postId + hash;
  const postUserId = (state && state.postUserId) || 74;

  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    joinRoom();
    socket.on('receive_message', (data) => {
      console.log(data);
      console.log('messageList in chat.js', messageList);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  const joinRoom = () => {
    socket.emit('join_room', room);
    getPreviousChatList();
  };

  const getPreviousChatList = () => {
    const payload = {
      room: room,
      seller_id: postUserId
    };

    const options = {
      method: 'POST',
      url: 'https://api.cokkirimarket.xyz/socket/chatroom',
      headers: {
        Accept: 'application/json'
      },
      withCredentials: true,
      data: { payload }
    };

    axios(options)
      .then((res) => {
        const previousChatData = res.data.data;
        setMessageList(previousChatData);
      })
      .catch((err) => null);
  };

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        user_id: userId,
        author: nickname,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes()
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  const renderChat = () => {
    return messageList.map((msg) => {
      let myChat = false;
      if (msg.user_id === userId) myChat = true;
      return (
        <Li className={myChat && 'myChat'}>
          <Nickname>{msg.author}</Nickname>
          <MessageInfo className={myChat && 'myChat'}>
            <Message className={myChat && 'myChat'}>{msg.message}</Message>
            <ChatTime>{msg.time}</ChatTime>
          </MessageInfo>
        </Li>
      );
    });
  };

  return (
    <Main>
      <Wrapper>
        <ChatLogUl>{renderChat()}</ChatLogUl>
        <ChatInputWrapper>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentMessage(e.target.value);
              inputRef.current.value = '';
              sendMessage();
            }}
          >
            <TextInput
              ref={inputRef}
              onChange={(e) => setCurrentMessage(e.target.value)}
            ></TextInput>
            <SubmitBtn>
              <Icon src='/icons/search.png' alt='' />
            </SubmitBtn>
          </Form>
        </ChatInputWrapper>
      </Wrapper>
    </Main>
  );
}

const Main = styled.main`
  margin-bottom: 3rem;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ChatLogUl = styled.ul`
  width: 100%;
  padding: 2rem;
  list-style: none;
  overflow: auto;
`;

const Li = styled.li`
  min-height: 2.2em;
  margin-bottom: 1.5rem;
  display: flex;
  font-size: 1rem;
  display: flex;
  flex-direction: column;

  &.myChat {
    text-align: right;
  }
`;

const Nickname = styled.span`
  margin-bottom: 0.2rem;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: flex-end;

  &.myChat {
    flex-direction: row-reverse;
  }
`;

const ChatTime = styled.span`
  margin: 0 0.2rem;
  font-size: 0.8rem;
`;

const Message = styled.span`
  max-width: 70%;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 1.2rem;

  &.myChat {
    background-color: ${({ theme }) => theme.colors.blue_base};
    color: white;
  }
`;

const ChatInputWrapper = styled.div`
  height: 2.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grey2};
  position: fixed;
  bottom: 0;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
`;

const TextInput = styled.input`
  height: 100%;
  width: 90%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

const SubmitBtn = styled.button`
  padding: 2px 5px;
  margin: 0 0.2rem;
  background: transparent;
  border-radius: 10px;
  border: none;
`;

const Icon = styled.img`
  height: 100%;
  width: 100%;
`;

export default Chat;
