import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../common/Modal';

const StLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const PostItemWrapper = styled.li`
  width: 100%;
  // height: 8rem;
  padding: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey_light};
  border-radius: 10px;
  // box-shadow: 1px 1px 10px -5px ${({ theme }) => theme.colors.blue_base};
  background-color: ${({ theme }) => theme.colors.white};
`;

const PostImg = styled.img`
  width: 11vh;
  height: 11vh;
  border: 1px solid ${({ theme }) => theme.colors.grey_light};
  // padding :2px
  border-radius: 50px;
`;

const PostInfo = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vw;
`;

const PostTitle = styled.h2`
  width: 100%;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 1;
  // overflow: hidden;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue_dark};
`;

const PostPrice = styled.span`
  color: ${({ theme }) => theme.colors.blue_dark};
  // font-size: 1.2rem;
  font-size: 0.7rem;
  font-weight: 700;
`;

function RoomItem({ info, userInfo }) {
  const navigate = useNavigate();
  console.log(info);
  console.log(userInfo);
  let my = userInfo.split('@')[0];
  const seller = info.post_id_post_post_has_chats[0].user.nickname;
  const buyer = info.user.nickname;
  const title = info.post_id_post_post_has_chats[0].title;

  console.log('my', my);
  console.log('seller', seller);
  console.log('buyer', buyer);
  console.log('title', title);

  let name;

  if (my === seller) name = buyer;
  else name = seller;

  console.log('my', my);

  let postId = info.room.split('#');
  let room = info.room;

  console.log('postId', postId);
  console.log('room', room);

  const img_src = info.post_id_post_post_has_chats[0].image_src;
  console.log('final', info.post_id_post_post_has_chats[0].user_id);
  const postUserId = info.post_id_post_post_has_chats[0].user_id;

  return (
    <PostItemWrapper
      onClick={() =>
        navigate(`/chat/${room}`, { state: { postUserId: postUserId } })
      }
    >
      <PostImg src={img_src ? img_src : './icons/elephant.png'} />
      <PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostPrice>{name}님과 채팅 중</PostPrice>
      </PostInfo>
    </PostItemWrapper>
  );
}

export default RoomItem;
