import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  JoinContainer,
  JoinTitle,
  JoinInputContainer,
  JoinInput,
  JoinBtn,
  JoinLine,
  ErrorMsg,
  ErrorMsgLast
} from './Join';

const MyEdit = ({ isLogin, accessToken }) => {
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState({
    user_id: '',
    password: '',
    passwordretype: ''
  });

  const id = userinfo.user_id;
  const pw = userinfo.password;
  const pwRe = userinfo.passwordretype;

  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [passwordReErrMsg, setPasswordReErrMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });

    if (pw !== '' && pwRe !== '' && pw !== pwRe)
      setPasswordReErrMsg('동일한 비밀번호를 입력하세요');
    else setPasswordReErrMsg('');

    const checkPassword = (e) => {
      const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,12}$/;
      return regExp.test(e);
    };
    if (pw !== '') {
      if (!checkPassword(pw))
        setPasswordErrMsg('4~12자로 숫자/영문자를 포함해 주세요');
      else setPasswordErrMsg('');
    }
  };

  const handleJoin = () => {
    if (id === '' || pw === '' || pwRe === '')
      return setErrorMessage('빈칸을 모두 입력하세요');

    if (passwordErrMsg === '4~12자로 숫자/영문자를 포함해 주세요')
      return setErrorMessage('비밀번호를 확인해 주세요');
    if (pw !== '' && pwRe !== '' && pw !== pwRe)
      return setErrorMessage('동일한 비밀번호를 입력하세요');

    const data = {
      user_id: id,
      password: pw
    };

    const options = {
      method: 'patch',
      url: 'https://dev.cokkiriserver.xyz/user',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      data: data
    };

    axios(options)
      .then((res) => {
        navigate('/mypage');
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setErrorMessage('회원가입 중 에러가 발생하였습니다');
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          setErrorMessage('회원가입 중 에러가 발생하였습니다');
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          setErrorMessage('회원가입 중 에러가 발생하였습니다');
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <main>
      <JoinContainer>
        <JoinTitle>EDIT</JoinTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          <JoinInputContainer>
            <JoinInput
              type='password'
              onChange={handleInputValue('password')}
              onKeyUp={handleInputValue()}
              placeholder='비밀번호 (총 4자 이상 12자 이하, 숫자/영문자 포함)'
            ></JoinInput>
          </JoinInputContainer>
          <ErrorMsg>{passwordErrMsg}</ErrorMsg>

          <JoinInputContainer>
            <JoinInput
              type='password'
              onChange={handleInputValue('passwordretype')}
              onKeyUp={handleInputValue()}
              placeholder='비밀번호 확인'
            ></JoinInput>
          </JoinInputContainer>
          <ErrorMsg>{passwordReErrMsg}</ErrorMsg>

          <JoinInputContainer>
            <JoinInput
              type='text'
              onChange={handleInputValue('user_id')}
              onKeyUp={handleInputValue()}
              placeholder='닉네임'
            />
          </JoinInputContainer>
        </form>
        <JoinLine />
        <ErrorMsgLast>{errorMessage}</ErrorMsgLast>
        <JoinBtn type='submit' onClick={handleJoin}>
          정보수정
        </JoinBtn>
      </JoinContainer>
    </main>
  );
};
export default MyEdit;

const layout = css`
  width: ${({ width }) => (width && `${width}`) || '100%'};
  height: ${({ height }) => (height && `${height}`) || `1px`};
  padding: 0.5rem;
`;

const Main = styled.main`
  ${layout}
  background-color: ${({ theme }) => theme.colors.grey_light};
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 90vh;
  position: fixed;
  bottom: 0;
`;
