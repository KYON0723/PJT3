import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { QuestionsGetAPI } from "../../api/Diary";
import { BrowserView, MobileView } from "react-device-detect";


const Home = () => {
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

    // const loginClickHandler = () => {
    //     //로그인 클릭
    //     navigate(`/login`);
    //     console.log("로그인 버튼 클릭!");
    // };





    useEffect(() => {
        callQuestionsGetAPI()
    }, []);


    const callQuestionsGetAPI = () => {
        QuestionsGetAPI()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <div className="main">
            <BrowserView>
                <h1>How Are You?</h1>
                <a href={kakaoRequestUrl}>
                <button type="button">Log in</button>
                </a>

                <section>
                    <article className="sky">
                        <img src="img/Sun.png" className="sun" alt="sun" />
                        <img src="img/Moon.png" className="moon" alt="moon" />
                    </article>

                    <article className="title">
                        <img src="img/LogoTitleBlack.png" className="logoTitleBlack" alt="blacktitle" />
                        <img src="img/LogoTitleWhite.png" className="logoTitleWhite" alt="whitetitle" />
                    </article>

                </section>
            </BrowserView>
            <MobileView>
                <img src="img/Logo.png" style={{ height: "45vh", position: "absolute", left: "50%", transform: "translate(-50% )" }} alt="blacktitle" />
                <a href={kakaoRequestUrl}>
                    <button type="button">Log in</button>
                </a>
            </MobileView>
        </div>
    );
};
export default Home;
