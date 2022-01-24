import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Join = ({ setShowModal, setModalMsg }) => {
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState({
    email: '',
    user_id: '',
    password: '',
    passwordretype: ''
  });

  const email = userinfo.email;
  const id = userinfo.user_id;
  const pw = userinfo.password;
  const pwRe = userinfo.passwordretype;

  const [errorMessage, setErrorMessage] = useState('');
  const [emailDupMsg, setEmailDupMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [passwordReErrMsg, setPasswordReErrMsg] = useState('');

  const chDuplicated = () => {
    const options = {
      method: 'get',
      url: `https://api.cokkirimarket.xyz/user/isduplicated/?email=${email}`
    };

    axios(options)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setEmailDupMsg(`${res.data.message}`);
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

    const checkEmail = (e) => {
      const regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return regExp.test(e);
    };
    if (email !== '') {
      if (!checkEmail(email)) setEmailErrMsg('유효한 이메일 형식이 아닙니다');
      else setEmailErrMsg('');
    }
  };

  const handleJoin = () => {
    if (emailDupMsg !== '사용가능한 닉네임입니다.')
      return setErrorMessage('이메일 중복검사를 해주세요');
    else setErrorMessage('');
    if (id === '' || pw === '' || pwRe === '' || email === '')
      return setErrorMessage('빈칸을 모두 입력하세요');
    if (emailErrMsg === '유효한 이메일 형식이 아닙니다')
      return setErrorMessage('이메일을 확인해 주세요');
    if (passwordErrMsg === '4~12자로 숫자/영문자를 포함해 주세요')
      return setErrorMessage('비밀번호를 확인해 주세요');
    if (pw !== '' && pwRe !== '' && pw !== pwRe)
      return setErrorMessage('동일한 비밀번호를 입력하세요');

    const data = {
      email: email,
      user_id: id,
      password: pw
    };

    const options = {
      method: 'post',
      url: 'https://api.cokkiriserver.xyz/user/signup',
      data: data
    };

    axios(options)
      .then((res) => {
        console.log(res);
        setShowModal(true);
        setModalMsg('가입이 완료되었습니다');
        navigate('/login');
      })
      .catch(function (error) {
        console.log(error);
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
        <JoinTitle>JOIN</JoinTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          <IdContainer>
            <IdInputContainer>
              <JoinInput
                type='email'
                onChange={handleInputValue('email')}
                onKeyUp={handleInputValue()}
                focusOut={chDuplicated}
                placeholder='이메일'
              ></JoinInput>
            </IdInputContainer>
            <IdDuplicatedBtn onClick={chDuplicated}>중복검사</IdDuplicatedBtn>
          </IdContainer>

          <ErrorMsg>{emailDupMsg}</ErrorMsg>
          <ErrorMsg>{emailErrMsg}</ErrorMsg>

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
        {/* <JoinLine /> */}
        <ErrorMsgLast>{errorMessage}</ErrorMsgLast>
        <JoinBtn type='submit' onClick={handleJoin}>
          회원가입
        </JoinBtn>
      </JoinContainer>
    </main>
  );
};

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  bottom: 0;
`;

export const JoinTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  color: #636363;
  font-family: Nanum Barun Gothic;
  font-size: 40px;
  font-weight: bold;
`;

export const JoinContents = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #636363;
  font-family: Nanum Barun Gothic;
  font-size: 14px;
  font-weight: bold;
`;

export const IdDuplicatedBtn = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #6793e6;
  background-color: #6793e6;
  padding: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const JoinInputContainer = styled.div`
  width: 280px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #eeeeee;
  background-color: white;
  padding: 2px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IdContainer = styled.div`
  width: 280px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const JoinInput = styled.input`
  width: 88%;
  height: 60%;
  border: none;
  background-color: #f9f9f9;
  text-align: left;
  background-color: white;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  outline: none;
  ::placeholder {
    color: #cdcdcd;
  }
  ::placeholder {
    font-size: 12px;
  }
`;

export const IdInputContainer = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #eeeeee;
  background-color: white;
  padding: 2px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const JoinBtn = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #6793e6;
  background-color: #6793e6;
  padding: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const JoinLine = styled.div`
  width: 240px;
  height: 2px;
  border-radius: 20px;
  background-color: #cdcbcb;
  margin: 10px;
`;

export const ErrorMsg = styled.div`
  width: 240px;
  height: 20px;
  border: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 3px;
  opacity: 0.5;
  text-align: left;
  color: #e670a1;
  border-radius: 20px;
  font-family: Nanum Barun Gothic;
  font-size: 12px;
  outline: none;
`;

export const ErrorMsgLast = styled.div`
  width: 240px;
  height: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  margin-top: 5px;
  opacity: 0.5;
  text-align: left;
  color: #e670a1;
  border-radius: 20px;
  font-family: Nanum Barun Gothic;
  font-size: 12px;
  outline: none;
`;

export default Join;
