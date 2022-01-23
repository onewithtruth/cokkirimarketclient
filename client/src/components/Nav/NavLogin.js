import styled from "styled-components";

export const NavLoginContainer = styled.div`
  /* display: inline; */
`;

export const LoginTitle = styled.div`
  margin-top: 3px;
  color : #323232;
  font-family: Nanum Barun Gothic;
  font-size : 9px;
  font-weight: bold;
`;

export const LoginIcon = styled.img`
  color : #323232;
  height: 20px;
`;

const NavLogin = () => {
  return (
    <NavLoginContainer>
      <LoginIcon src="/icons/join.png"/>
      <LoginTitle>로그인</LoginTitle>
    </NavLoginContainer>
  );
};

export default NavLogin;