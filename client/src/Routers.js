import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage';
import Login from './pages/Login.js';
import Join from './pages/Join';
import List from './pages/List';
import Post from './pages/Post';
import Add from './pages/Add';
import Chat from './pages/Chat';
import Search from './pages/Search';
import MyPosts from './pages/MyPosts';
import MyEdit from './pages/MyEdit';
import Oauth from './pages/Oauth';
import Modify from './pages/Modify';

export const Routers = ({
  isLogin,
  setIsLogin,
  handleResponseSuccess,
  userInfo,
  setUserInfo,
  handleLogout,
  accessToken,
  setAccessToken,
  getUserInfo,
  userId,
  setShowModal
}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<List isLogin={isLogin} />}></Route>
        <Route
          path='/list/:id'
          element={
            <Post isLogin={isLogin} accessToken={accessToken} userId={userId} />
          }
        ></Route>
        <Route
          path='/add'
          element={<Add isLogin={isLogin} accessToken={accessToken} />}
        ></Route>
        <Route
          path='/modify/:id'
          element={<Modify accessToken={accessToken} />}
        ></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/join' element={<Join setShowModal={setShowModal} />} />
        <Route
          path='/login'
          element={
            <Login
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleResponseSuccess={handleResponseSuccess}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              getUserInfo={getUserInfo}
            />
          }
        />
        <Route
          path='/mypage'
          element={
            <MyPage
              isLogin={isLogin}
              userInfo={userInfo}
              handleLogout={handleLogout}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
            />
          }
        />
        <Route path='/chat' element={<Chat />} />
        <Route
          path='/myposts'
          element={<MyPosts accessToken={accessToken} />}
        />
        <Route
          path='/myedit'
          element={<MyEdit isLogin={isLogin} accessToken={accessToken} />}
        />
        <Route
          path='/oauth'
          element={
            <Oauth
              isLogin={isLogin}
              userInfo={userInfo}
              handleLogout={handleLogout}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
            />
          }
        />
      </Routes>
    </>
  );
};
