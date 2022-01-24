import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Routers } from './Routers';
import axios from 'axios';
import Header from './components/Header';
import Nav from './components/Nav';
import { Modal } from './components/common/Modal';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);

  const navigate = useNavigate();
  const isAuthenticated = () => {
    setIsLogin(true);
  };
  const handleResponseSuccess = (email) => {
    setUserInfo(email);
    isAuthenticated();
  };

  const modalHandler = (a) => {
    setShowModal(a);
  };

  const handleLogout = () => {
    setUserInfo(null);
    setIsLogin(false);
    navigate('/login');
    setAccessToken('');

    axios
      .get('https://api.cokkirimarket.xyz/user/logout', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const getUserInfo = (token) => {
    const options = {
      method: 'get',
      url: `https://api.cokkirimarket.xyz/user/mypage`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    axios(options)
      .then((res) => {
        setUserId(res.data.userInfo.id);
      })
      .catch();
  };

  useEffect(() => {
    // isAuthenticated();
  }, [showModal, isLogin]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Routers
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleResponseSuccess={handleResponseSuccess}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleLogout={handleLogout}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          getUserInfo={getUserInfo}
          userId={userId}
          setShowModal={setShowModal}
        ></Routers>
        {showModal ? (
          <Modal modalHandler={modalHandler}>회원가입 완료</Modal>
        ) : null}
        <Nav isLogin={isLogin} />
      </ThemeProvider>
    </>
  );
}

export default App;
