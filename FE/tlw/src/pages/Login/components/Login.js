import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

const Login = () => {
    const navigate = useNavigate();

    //카카오 OAUTH 주소
    const kakaoAuthUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
    const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const kakaoRedirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;

    let kakaoRequestUrl = kakaoAuthUrl;
    kakaoRequestUrl += `?client_id=${kakaoClientId}`;
    // kakaoRequestUrl += `&state=${state}`; ?
    kakaoRequestUrl += `&redirect_uri=${kakaoRedirectUrl}`;
    kakaoRequestUrl += "&response_type=code";

    //구글 OAUTH 주소
    const googleAuthUrl = process.env.REACT_APP_GOOGLE_AUTH_URL;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const googleRedirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
    const googleScope = process.env.REACT_APP_GOOGLE_SCOPE;

    let googleRequestUrl = googleAuthUrl;
    googleRequestUrl += `?client_id=${googleClientId}`;
    googleRequestUrl += `&redirect_uri=${googleRedirectUrl}`;
    googleRequestUrl += `&scope=${googleScope}`;
    googleRequestUrl += "&response_type=code&service=lso&o2v=2&flowName=GeneralOAuthFlow";


    const naverLoginClickHandler = () => {
        //네이버 로그인 클릭
        navigate(`/diary`);
    };
    const KakaoLoginClickHandler = () => {
        //카카오 로그인 클릭
        // console.log(kakaoRequestUrl)
        // console.log(process.env.REACT_APP_API_URL)
        // navigate(`/diary`);
    };
    const GoogleLoginClickHandler = () => {
        //구글 로그인 클릭
        navigate(`/diary`);
    };


    return (
        <>
            <BrowserView>w
                <div className="login-components">
                    <a href={kakaoRequestUrl}>
                        <button class="button-49" onClick={KakaoLoginClickHandler}><span class="text">카카오 로그인</span></button>
                    </a>
                    {/* <a href={googleRequestUrl}>
                        <button class="button-50" onClick={GoogleLoginClickHandler}><span class="text"> 구글  로그인</span></button>
                    </a> */}
                </ div>
            </BrowserView>
            <MobileView>
                <div className="login-components-m">
                    <a href={kakaoRequestUrl}>
                        <button class="button-49-m" onClick={KakaoLoginClickHandler}><span class="text">카카오 로그인</span></button>
                    </a>
                    {/* <a href={googleRequestUrl}>
                        <button class="button-50-m" onClick={GoogleLoginClickHandler}><span class="text"> 구글  로그인</span></button>
                    </a> */}
                </ div>
            </MobileView>
        </>
    );
}

export default Login;