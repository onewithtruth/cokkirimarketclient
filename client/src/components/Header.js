import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavList from './Nav/NavList';
import NavSearch from './Nav/NavSearch';
import NavLogin from './Nav/NavLogin';
import NavMyPage from './Nav/NavMyPage';
import NavChat from './Nav/NavChat';
import { Link } from 'react-router-dom';
import { NavContainer, NavTitle } from './Nav';

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 50px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.grey};
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  padding: 0 3vw;
  align-items: center;
`;

const LogoWrapper = styled(Wrapper)`
  justify-content: center;
`;

const Icon = styled.img`
  height: 98%;
  cursor: pointer;
`;

const HeaderMenuContainer = styled.div`
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

function Header({ isLogin }) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Wrapper>
        <Icon src='/icons/arrow-small-left.png' onClick={() => navigate(-1)} />
      </Wrapper>
      <LogoWrapper>
        <Icon src='/icons/elephant.png' onClick={() => navigate('/')} />
        (10:11)
      </LogoWrapper>

      <HeaderMenuContainer>
        {/* <Link to='/ ' style={{ textDecoration: 'none' }}>
          <NavList />
        </Link>
        <Link to='/search' style={{ textDecoration: 'none' }}>
          <NavSearch />
        </Link>
        {isLogin ? null : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <NavLogin />
          </Link>
        )}
        {isLogin ? (
          <Link to='/chatroomlist' style={{ textDecoration: 'none' }}>
            <NavChat />
          </Link>
        ) : null}
        {isLogin ? (
          <Link to='/mypage' style={{ textDecoration: 'none' }}>
            <NavMyPage />
          </Link>
        ) : null} */}
      </HeaderMenuContainer>
    </HeaderWrapper>
  );
}

export default Header;
