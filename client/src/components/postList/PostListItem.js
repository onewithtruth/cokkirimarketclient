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
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
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
  justify-content: space-around;
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

  const priceFormatter = (price) => {
    let result = '';
    let count = 0;

    if (price.length % 3 > 0) {
      result = price.slice(0, price.length % 3) + ',';
    }

    let slicedPrice = price.slice(price.length % 3);

    for (let i = 0; i < slicedPrice.length; i++) {
      count++;
      result += slicedPrice[i];
      if (i < slicedPrice.length - 1 && count % 3 === 0) result += ',';
    }
    return result + ' 원';
  };

  return (
    <StLink to={`/list/${info.id}`}>
      <PostItemWrapper>
        <PostImg
          src={info.image_src ? info.image_src : './icons/elephant.png'}
        />
        <PostInfo>
          <PostTitle>{info.title}</PostTitle>
          <PostCategory>{category}</PostCategory>
          <PostPrice>{priceFormatter(info.price)}</PostPrice>
        </PostInfo>
      </PostItemWrapper>
    </StLink>
  );
}

//
export default PostListItem;
