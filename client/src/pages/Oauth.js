/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
import axios from 'axios';
// import { isEmail } from "./formCheck";

function Oauth ({ isLogin, setIsLogin, setAccessToken }) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  console.log('isLogin',isLogin)

  useEffect(() => {
    let url = new URL(window.location.href);
    let authorizationCode = url.searchParams.get("code");
    console.log('authorizationCode', authorizationCode)
    if (authorizationCode) {
      handleGithubLogin(authorizationCode);
      handleGoogleLogin(authorizationCode);
      handleKakaoLogin(authorizationCode);
    }
  }, [])

  const handleInputValue = (key) => (e) => {
    if (key === "email") {
      // console.log(isEmail(e.target.value));
      setEmail(e.target.value);
    }
    if (key === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSignIn = async () => {
    const payload = {
      email: email,
      password: password
    }

    const options = {
      method: "POST",
      url: "https://localhost:8080/signin",
      headers: {
        'Accept': 'application/json'
      },
      withCredentials: true,
      data: { payload }

    }
    if ( !email || !password) {
      alert('email or password cannot be empty!');
    } else {
      await axios(options)
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data.data.accessToken);
        if(response.data.data.accessToken) {
          setIsLogin(true);
          setAccessToken(response.data.data.accessToken)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }   
  };
  
  const socialLoginHandler = (key) => (e) => {
    const redirectUri = 'https://localhost:3000'
    if (key === "github") {
      const githubclientId =
      '84a0db73c9e6deeb8373';
      const GITHUB_LOGIN_URL = 
        `https://github.com/login/oauth/authorize?client_id=${githubclientId}&redirect_uri=${redirectUri}`;
      window.location.assign(GITHUB_LOGIN_URL)
    }
    if (key === "google") { 
      const googleclientId = 
        '501112464013-qt92mjpu5ff28hg0he5p815r75oa97o3.apps.googleusercontent.com';
      const googlescope = 'email+profile';
      const GOOGLE_LOGIN_URL =
        `https://accounts.google.com/o/oauth2/auth?client_id=${googleclientId}&redirect_uri=${redirectUri}&scope=${googlescope}&response_type=code`;
      window.location.assign(GOOGLE_LOGIN_URL)
      
    }
    if (key === "kakao") { 
      const kakaoclientId = 
        '0ec20dcb23cf6dd3b52bd4d5851a0f15';
      const KAKAO_LOGIN_URL =
      `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoclientId}&redirect_uri=${redirectUri}&response_type=code`;
      window.location.assign(KAKAO_LOGIN_URL)
      
    }
    
  }

  
  const handleGithubLogin = async (authorizationCode) => {
    const options = {
      method: "POST",
      url: "https://dev.cokkiriserver.xyz/oauth/oauthgithub",
      // url: "https://localhost:8080/oauth/oauthgithub",
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    }

    await axios(options)
      .then((response) => {
        console.log(response)
        setIsLogin(true);
        setAccessToken(response.data.accessToken);
      })
      .catch((err) => null);
  };

  const handleGoogleLogin = async (authorizationCode) => {
		const options = {
      method: "POST",
      url: "https://dev.cokkiriserver.xyz/oauth/oauthgoogle",
      // url: "https://localhost:8080/oauth/oauthgoogle",
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    }

    await axios(options)
      .then((response) => {
        console.log(response)
        setIsLogin(true);
        setAccessToken(response.data.accessToken);
      })
      .catch((err) => null);
	}

  const handleKakaoLogin = async (authorizationCode) => {
		const options = {
      method: "POST",
      url: "https://dev.cokkiriserver.xyz/oauth/oauthkakao",
      // url: "https://localhost:8080/oauth/oauthkakao",
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: { authorizationCode: authorizationCode }
    }

    await axios(options)
      .then((response) => {
        console.log(response)
        setIsLogin(true);
        setAccessToken(response.data.accessToken);
      })
      .catch((err) => null);
	}

  // const accessTokenRequest = async () => {
  //   await axios
  //     .get("https://localhost:8080/tokenrequest", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Accept": "application/json",
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.message !== "ok") {
  //         const message =
  //           "access token이 만료되어 불러올 수 없습니다. refresh token을 사용해주시기 바랍니다.";
  //         return this.setState({ email: message, createdAt: message });
  //       }
  //       const { createdAt, userId, email } = res.data.data.userInfo;
  //       this.setState({ userId, createdAt, email });
  //     });
  // }

  // const refreshTokenRequest = async () => {
  //   await axios
  //     .get("https://localhost:8080/tokenrequest", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.message !== "ok") {
  //         const message =
  //           "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
  //         return this.setState({ email: message, createdAt: message });
  //       }
  //       const { createdAt, userId, email } = res.data.data.userInfo;
  //       this.setState({ userId, createdAt, email });
  //       this.props.issueAccessToken(res.data.data.accessToken);
  //     });
  // }

  return (
    <div className='loginScreen'>
      <div className='loginContainer'>
        <h4>OAuth 2.0 Log in TEST</h4>
        <img id="logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
        {isLogin ? <h2>Logged in !!</h2> : <div>not yet Logged in</div>}
        {isLogin ? null
          : <div>
            <GithubLoginButton onClick={socialLoginHandler("github")} />
            <GoogleLoginButton onClick={socialLoginHandler("google")} />
            <button onClick={socialLoginHandler("kakao")}>Log in with Kakao</button>
          </div>
        }
      </div>
        <div>
          <h4>Password Login TEST</h4>
          <input
            type="text"
            placeholder="Enter Email"
            onChange={handleInputValue("email")}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handleInputValue("password")}
          />
          <button type="button" className="signupbtn" onClick={handleSignIn}>
              Log in
          </button>
        </div>
        <div>
          <button>access token request</button>
          <button>refresh token request</button>
        </div>
    </div>
  );
}

export default Oauth;