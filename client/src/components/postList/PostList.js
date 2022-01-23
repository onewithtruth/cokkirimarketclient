import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';

const PostListWrapper = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.grey_light};
`;

function PostList({ posts }) {
  return (
    <PostListWrapper>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <PostListItem key={post.id} info={post} />;
        })
      ) : (
        <li>아무것도 없어요</li>
      )}
    </PostListWrapper>
  );
}

export default PostList;
