import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({
  isLogin,
  setIsLogin,
  handleResponseSuccess,
  accessToken,
  setAccessToken,
  userInfo,
  setUserInfo,
  getUserInfo,
  setNickname
}) => {
  useEffect(() => {
    let url = new URL(window.location.href);
    let authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      console.log('코드있음');
      handleGithubLogin(authorizationCode);
      handleGoogleLogin(authorizationCode);
      handleKakaoLogin(authorizationCode);
    }
  }, []);

  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      return setErrorMessage('아이디와 비밀번호를 입력하세요');
    } else {
      const options = {
        method: 'post',
        url: 'https://api.cokkirimarket.xyz/user/login',
        data: loginInfo,
        withCredentials: true
      };

      axios(options)
        .then((res) => {
          handleResponseSuccess(loginInfo.email);
          setAccessToken(res.data.accessToken);
          navigate('/mypage');
          getUserInfo(res.data.accessToken);
          setNickname(res.data.userInfo.nickname);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400)
              return setErrorMessage('이메일/비밀번호가 맞지 않습니다');
            else {
              setErrorMessage('로그인 중 에러가 발생하였습니다');
            }
          }
        });
    }
  };

  const socialLoginHandler = (key) => (e) => {
    const redirectUri = 'https://cokkirimarket.xyz/login';
    if (key === 'github') {
      const githubclientId = '84a0db73c9e6deeb8373';
      const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${githubclientId}&redirect_uri=${redirectUri}`;
      window.location.assign(GITHUB_LOGIN_URL);
    }
    if (key === 'google') {
      const googleclientId =
        '501112464013-qt92mjpu5ff28hg0he5p815r75oa97o3.apps.googleusercontent.com';
      const googlescope = 'email+profile';
      const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${googleclientId}&redirect_uri=${redirectUri}&scope=${googlescope}&response_type=code`;
      window.location.assign(GOOGLE_LOGIN_URL);
    }
    if (key === 'kakao') {
      const kakaoclientId = '0ec20dcb23cf6dd3b52bd4d5851a0f15';
      const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoclientId}&redirect_uri=${redirectUri}&response_type=code`;
      window.location.assign(KAKAO_LOGIN_URL);
    }
  };

  const handleGithubLogin = async (authorizationCode) => {
    const options = {
      method: 'POST',
      url: 'https://api.cokkirimarket.xyz/oauth/oauthgithub',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    };

    await axios(options)
      .then((response) => {
        setIsLogin(true);
        setAccessToken(response.data.data.accessToken);
        setUserInfo(response.data.data.email);
        navigate('/mypage');
        getUserInfo(response.data.data.accessToken);
        setNickname(response.data.data.nickname);
      })
      .catch((err) => null);
  };

  const handleGoogleLogin = async (authorizationCode) => {
    const options = {
      method: 'POST',
      url: 'https://api.cokkirimarket.xyz/oauth/oauthgoogle',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    };

    await axios(options)
      .then((response) => {
        setIsLogin(true);
        setAccessToken(response.data.data.accessToken);
        setUserInfo(response.data.data.email);
        navigate('/mypage');
        getUserInfo(response.data.data.accessToken);
        setNickname(response.data.data.nickname);
      })
      .catch((err) => null);
  };

  const handleKakaoLogin = async (authorizationCode) => {
    const options = {
      method: 'POST',
      url: 'https://api.cokkirimarket.xyz/oauth/oauthkakao',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    };

    await axios(options)
      .then((response) => {
        setAccessToken(response.data.data.accessToken);
        getUserInfo(response.data.data.accessToken);
        setUserInfo(response.data.data.email);
        setIsLogin(true);
        navigate('/mypage');
        setNickname(response.data.data.nickname);
      })
      .catch((err) => null);
  };

  const handleTestLogin = () => {
    setLoginInfo({ email: 'test@test.com', password: 'd' });
    handleLogin();
  };

  return (
    <main>
      <LoginContainer onSubmit={(e) => e.preventDefault()}>
        <LoginTitle>LOGIN</LoginTitle>

        <LoginInputContainer>
          <LoginInput
            type='email'
            onChange={handleInputValue('email')}
            placeholder='이메일을 입력하세요'
          ></LoginInput>
        </LoginInputContainer>
        <LoginInputContainer>
          <LoginInput
            type='password'
            onChange={handleInputValue('password')}
            placeholder='비밀번호를 입력하세요'
          ></LoginInput>
        </LoginInputContainer>
        <LoginBtn type='submit' onClick={handleLogin}>
          로그인
        </LoginBtn>
        <ErrorMsg>{errorMessage}</ErrorMsg>
        <LoginLine />
        <Link to='/join' style={{ textDecoration: 'none' }}>
          <JoinBtnMail>메일로 시작하기 </JoinBtnMail>
        </Link>

        {/* <JoinBtnGithub onClick={socialLoginHandler('github')}>
          깃허브로 시작하기
        </JoinBtnGithub> */}
        <JoinBtnGithub onClick={handleTestLogin}>
          테스트 계정으로 시작하기
        </JoinBtnGithub>

        <JoinBtnGoogle onClick={socialLoginHandler('google')}>
          {' '}
          구글로 시작하기
        </JoinBtnGoogle>

        <JoinBtnKaKao onClick={socialLoginHandler('kakao')}>
          {' '}
          카카오로 시작하기
        </JoinBtnKaKao>
      </LoginContainer>
    </main>
  );
};

export default Login;

export const LoginContainer = styled.div`
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

export const LoginTitle = styled.div`
  margin-bottom: 20px;
  color: #636363;
  font-family: Nanum Barun Gothic;
  font-size: 40px;
  font-weight: bold;
`;

export const LoginInputContainer = styled.div`
  width: 240px;
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

export const LoginInput = styled.input`
  width: 80%;
  height: 60%;
  border: none;
  background-color: white;
  text-align: left;
  color: #808080;
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

export const LoginBtn = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #6793e6;
  /* box-shadow: 0px 0px 10px #e8e7e7; */
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

export const LoginLine = styled.div`
  width: 240px;
  height: 2px;
  border-radius: 20px;
  background-color: #cdcbcb;
  margin: 10px;
`;

export const JoinBtnMail = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #ffb398;
  background-color: #ffb398;
  padding: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const JoinBtnGithub = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #656565;
  background-color: #656565;
  padding: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const JoinBtnGoogle = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #c7c7c7;
  color: #f9f9f9;
  padding: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #656565;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const JoinBtnKaKao = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #ffd600;
  background-color: #ffd600;
  color: #f9f9f9;
  padding: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Nanum Barun Gothic;
  font-size: 15px;
  font-weight: bold;
`;

export const ErrorMsg = styled.div`
  width: 240px;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #e670a1; */
  opacity: 0.5;
  text-align: left;
  color: #e670a1;
  border-radius: 20px;
  font-family: Nanum Barun Gothic;
  font-size: 15px;
  outline: none;
`;
