import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Wrapper>
        <Icon src='/icons/arrow-small-left.png' onClick={() => navigate(-1)} />
      </Wrapper>
      <LogoWrapper>
        <Icon src='/icons/elephant.png' onClick={() => navigate('/')} />
      </LogoWrapper>
    </HeaderWrapper>
  );
}

export default Header;
