import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage';
import Login from './pages/Login.js';
import Join from './pages/Join';
import List from './pages/List';
import Post from './pages/Post';
import Add from './pages/Add';
import ChatRoomList from './pages/ChatRoomList';
import Search from './pages/Search';
import MyPosts from './pages/MyPosts';
import MyEdit from './pages/MyEdit';
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
  setShowModal,
  setModalMsg
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
        <Route
          path='/join'
          element={
            <Join setShowModal={setShowModal} setModalMsg={setModalMsg} />
          }
        />
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
              setModalMsg={setModalMsg}
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
              setModalMsg={setModalMsg}
            />
          }
        />
        <Route
          path='/chatroomlist'
          element={<ChatRoomList userId={userId} userInfo={userInfo} />}
        />
        <Route
          path='/myposts'
          element={<MyPosts accessToken={accessToken} />}
        />
        <Route
          path='/myedit'
          element={
            <MyEdit
              isLogin={isLogin}
              accessToken={accessToken}
              setShowModal={setShowModal}
              setModalMsg={setModalMsg}
            />
          }
        />
      </Routes>
    </>
  );
};
