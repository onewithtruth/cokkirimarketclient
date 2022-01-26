import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue_dark};
`;

const PostPrice = styled.span`
  color: ${({ theme }) => theme.colors.blue_dark};
  // font-size: 1.2rem;
  font-size: 10px;
  font-weight: 700;
`;

function RoomItem({ info, userInfo }) {
  let id;

  if (userInfo.length > 0) {
    id = userInfo.split('@')[0];
  } else {
    id = userInfo;
  }

  console.log(info);

  // console.log(info.user.nickname);
  const postId = info.id;
  // const buyer = info.chat_id_chats[0].room.split('#')[1].split('@')[0];
  const buyer = info.room.split('#')[1].split('@')[0];
  const buyerEmail = info.room.split('#')[1];
  // const buyer = info.room.split('#')[1].split('@')[0];
  const seller = info.post_id_post_post_has_chats[0].user.nickname;
  const img_src = info.post_id_post_post_has_chats[0].image_src;

  console.log('id', id);
  console.log('seller', seller);
  console.log('buyer', buyer);

  if (id !== seller) id = seller;
  else id = buyer;

  console.log('id', id);
  console.log('seller', seller);
  console.log('buyer', buyer);

  return (
    <StLink to={`/chat/${postId}#${buyerEmail}`}>
      <PostItemWrapper>
        <PostImg src={img_src ? img_src : './icons/elephant.png'} />
        <PostInfo>
          <PostTitle>{info.title}</PostTitle>
          <PostPrice>{id}</PostPrice>
        </PostInfo>
      </PostItemWrapper>
    </StLink>
  );
}

export default RoomItem;
