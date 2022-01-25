import React from 'react';
import styled from 'styled-components';
import RoomItem from './RoomItem';

const PostListWrapper = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.grey_light};
`;

function RoomList({ roomData, userInfo }) {
  console.log(roomData);
  return (
    <PostListWrapper>
      {roomData.length > 0 ? (
        roomData.map((post) => {
          return <RoomItem key={post.id} info={post} userInfo={userInfo} />;
        })
      ) : (
        <li>아무것도 없어요</li>
      )}
    </PostListWrapper>
  );
}

export default RoomList;
