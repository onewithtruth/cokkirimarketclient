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
  height: 8rem;
  padding: 3vh;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
  box-shadow: 1px 1px 10px -5px ${({ theme }) => theme.colors.blue_base};
  background-color: ${({ theme }) => theme.colors.white};
`;

const PostImg = styled.img`
  width: 11vh;
  height: 11vh;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue_dark};
`;

const PostCategory = styled.span`
  color: ${({ theme }) => theme.colors.grey_dark};
  font-size: 0.8rem;
`;

const PostPrice = styled.span`
  color: ${({ theme }) => theme.colors.blue_dark};
  font-size: 1.2rem;
  font-weight: 700;
`;

function PostListItem({ info }) {
  const category = info.post_has_categories[0]
    ? info.post_has_categories[0].category.category
    : '없음';

  return (
    <StLink to={`/list/${info.room.split('@')[0]}`}>
      <PostItemWrapper>
        <PostImg
          src={info.image_src ? info.image_src : './icons/elephant.png'}
        />
        <PostInfo>
          <PostTitle>{info.title}</PostTitle>
          <PostCategory>{category}</PostCategory>
          <PostPrice>{info.price + ' 원'}</PostPrice>
        </PostInfo>
      </PostItemWrapper>
    </StLink>
  );
}

//
export default PostListItem;
