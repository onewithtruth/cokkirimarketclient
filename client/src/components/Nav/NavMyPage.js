import styled from "styled-components";

export const NavMyPageContainer = styled.div`
  display: inline;
    height: 50%;
    width: 10%;
    color : #323232;
`;

export const MyPageTitle = styled.div`

margin-top: 3px;
  color : #323232;
  font-family: Nanum Barun Gothic;
  font-size : 8px;
  font-weight: bold;
`;

export const ProfileIcon = styled.img`
  color : #323232;
  height: 20px;
`;

const NavMyPage = () => {
  return (
    <NavMyPageContainer>
      <ProfileIcon src="icons/mypage.png" />
      <MyPageTitle>내 정보</MyPageTitle>
    </NavMyPageContainer>
  );
};

export default NavMyPage;