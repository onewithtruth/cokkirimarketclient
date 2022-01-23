import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SmallButton from '../components/common/SmallButton';
import PostButtonWrapper from '../components/PostButtonWrapper';
import { Modal } from '../components/common/Modal';
import { useNavigate } from 'react-router-dom';

function Post({ isLogin, accessToken, userId }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const postId = Number(pathname.split('/')[2]);
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    console.log(postId);
    console.log(accessToken); // string('')
    getPostDetails();
  }, []);

  const getPostDetails = () => {
    const options = {
      method: 'get',
      url: `https://dev.cokkiriserver.xyz/post?id=${postId}`
    };

    axios(options)
      .then((res) => {
        const currentPost = res.data.data[0];
        console.log(currentPost);
        setPostInfo(currentPost);
      })
      .catch();
  };

  const changeDateForm = (prev) => {
    '2022-01-22T14:23:46.000Z';
    let curr = prev.slice(0, 10).split('-');
    return `${curr[0]}년 ${curr[1]}월 ${curr[2]}일`;
  };

  const deletePost = () => {
    console.log('delete');
    const options = {
      method: 'delete',
      url: `https://api.cokkirimarket.xyz/post?id=${postId}`,
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };

    axios(options).then((res) => {
      navigate('/', { replace: true });
    });
  };

  return (
    <Main height='100vh'>
      <Section height='20rem'>
        <Img height='100%' src={postInfo.image_src} />
      </Section>
      <MainSection height='5rem'>
        <Price fontSize='1.5rem' fontWeight='700'>
          {postInfo.price} 원
        </Price>
        <PostButtonWrapper
          isLogin={isLogin}
          accessToken={accessToken}
          postUserId={postInfo.user_id}
          userId={userId}
          postId={postId}
          postInfo={postInfo}
          deletePost={deletePost}
        ></PostButtonWrapper>
      </MainSection>
      <InfoSection height='18rem'>
        <Title fontSize='1.4rem' fontWeight='700'>
          {postInfo.title}
        </Title>
        <PostInfo fontSize='0.9rem' fontWeight='200'>
          {postInfo.user && postInfo.user.nickname} *{' '}
          {postInfo.updatedAt && changeDateForm(postInfo.updatedAt)}
        </PostInfo>
        <p>{postInfo.contents}</p>
      </InfoSection>
    </Main>
  );
}

const layout = css`
  width: ${({ width }) => (width && `${width}`) || '100%'};
  height: ${({ height }) => (height && `${height}`) || `1px`};
  padding: 0.5rem;
`;

const Main = styled.main`
  ${layout}
  background-color: ${({ theme }) => theme.colors.grey_light};
`;

const Section = styled.section`
  ${layout}
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: white;

  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const MainSection = styled(Section)`
  display: flex;
  align-items: center;
  padding: 1rem 1.4rem;
  position: relative;
`;

const InfoSection = styled(Section)`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const font = css`
  font-size: ${({ fontSize }) => fontSize && `${fontSize}`};
  font-weight: ${({ fontWeight }) => fontWeight && ` ${fontWeight}`};
`;

const Price = styled.span`
  ${font}
`;

const Title = styled.h2`
  ${font}
`;

const PostInfo = styled.span`
  ${font}
  color: ${({ theme }) => theme.colors.grey_dark}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export default Post;
