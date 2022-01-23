import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
`;

export const MyPageTitle = styled.div`
  margin-bottom: 20px;
  color : #636363;
  font-family: Nanum Barun Gothic;
  font-size : 40px;
  font-weight: bold;
`;

export const MyPageMenu = styled.div`
  width: 240px;
  height: 50px;
  border-radius: 10px;
  border: 3px solid #eeeeee;
  /* box-shadow: 0px 0px 10px #e8e7e7; */
  background-color: white;
  padding: 2px; 
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  text-align: center;
  color : #4f4f4f;
  font-family: Nanum Barun Gothic;
  font-size : 15px;
  font-weight: bold;
`;

export const MyPageId = styled.div`
  /* background-color: grey; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #e8e7e7;
  width: 240px;
  height: 50px;
  margin: 10px;
  color: black;
`;

export const MyMenuIcon = styled.img`
  margin: 10px;
  height: 28px;
`;

const MyPage = ({ isLogin, setIsLogin, setUserInfo, userInfo, handleLogout, accessToken, setAccessToken }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isLogin===false) navigate('/login')
  }, [isLogin, navigate])
  
  const handleSignout = () => {

    axios.delete("https://api.cokkirimarket.xyz/user/delete", {
      headers: {
        "Authorization" : "Bearer "+ accessToken
      }
    })
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
        setAccessToken('')
        navigate('/login')
        console.log('signout 성공')
      })
      .catch((err) => {
        console.log('signout 실패')
    });


  }

  return (
    <main>
    <MyPageContainer>
    {accessToken}      
      <MyPageTitle>My Page</MyPageTitle>
      <MyPageId>{userInfo} 님 환영합니다</MyPageId>

      <Link to='/myposts' style={{ textDecoration: 'none' }}>
      <MyPageMenu>
        <MyMenuIcon src="/icons/mygoods.png" />
        나의 판매내역
      </MyPageMenu>
      </Link>



      <Link to='/myedit' style={{ textDecoration: 'none' }}>
      <MyPageMenu>
        <MyMenuIcon src="/icons/correct.png" />
        나의 정보수정
      </MyPageMenu>
      </Link>



      <MyPageMenu
        onClick={handleLogout}
      >
      <MyMenuIcon src="/icons/logout.png" />
        로그아웃 하기
      </MyPageMenu>



      <MyPageMenu
       onClick={handleSignout}
      >
        <MyMenuIcon src="/icons/cancel.png" />
        회원탈퇴 하기
      </MyPageMenu>
    </MyPageContainer>
    </main>
  );
};

export default MyPage;