import {useNavigate} from "react-router-dom";
import "./Welcome.scss";
import {themeDefault, theme1, theme2} from "../../components/themeColor";
import {useEffect, useState} from "react";
import {CalDetailGetAPI, CalGetAPI} from "../../api/Cal";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setFeel, setMusicList, setToday} from "../../store/slices/authSlice";
import AudioPlayer from 'react-h5-audio-player';

const Welcome = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
    // const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmljayI6IuyEseuylCIsInVzZXJFbWFpbCI6ImJva3NiMUBuYXZlci5jb20iLCJ1c2VyU2VxIjoxOCwiaWF0IjoxNjY4NzQ0NDMyLCJleHAiOjE2NjkzNDkyMzJ9.rNb7iDYVWVgtYq0Ge-yC6qcOYevSYMqm2Gsgp-JG84Y`;

    const currentTimer = () => {
        const date = new Date();
        const years = String(date.getFullYear()).padStart(2, "0");
        const monthes = date.getMonth() + 1;
        const daies = String(date.getDate()).padStart(2, "0");

        dispatch(setToday({today:`${years}-${monthes}-${daies}`}));
        return `${years}-${monthes}-${daies}`;
    }

    const startClickHandler = () => {
        const today = currentTimer()
        const data = {
            calYmd: today, // 여기에 today 를 이용해서 써야합니다 form) YYYY-MM-DD
            // calYmd: "2022-05-11", // 여기에 today 를 이용해서 써야합니다 form) YYYY-MM-DD
        }
        CalDetailGetAPI(data, token)
            .then((res) => {
                console.log(res);
                props.setMusicList(res.recommendList)
                dispatch(setFeel({feel: res.calEmotion}))
                dispatch(setMusicList({musicList: res.recommendList}))
                props.setSubmit(true)
                props.setStart(false);
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status === 500){
                    console.log(err.response.status)
                    props.setStart(false); // 일기작성으로 이동?!
                }
            })
        };

    const cancleClickHandler = () => {
        navigate(`/calender`);
    };

    // 테마 설정 세트
    const theme = useSelector((state) => state.theme.themedata)
    const [themeColor, setThemeColor] = useState({})

    useEffect(() => {
        console.log(themeDefault)
        if (theme === "default") {
            setThemeColor(themeDefault)
        } else if (theme === "theme1") {
            setThemeColor(theme1)
        } else if (theme === "theme2") {
            setThemeColor(theme2)
        }
    }, [theme])
    // 테마 설정 세트 끝

    return (
        <div className="diaryWelcome">
            <AudioPlayer
                style={{
                    display: 'none'
                }}
                autoPlay="autoPlay"
                src="https://gumi-d209.s3.ap-northeast-2.amazonaws.com/Question/0.mp3"
                showSkipControls={false}
                showJumpControls={false}/>
            <figure
                style={{
                    background: `${themeColor.background}`,
                    color: `${themeColor.color}`
                }}>
                <h1 className="typing-demo">
                    오늘 하루는 어떠셨나요? 이야기를 들려주세요
                </h1>

                <div className="wrapper-button">
                    <button type="button" onClick={startClickHandler}>Start</button>
                    <button className="canclebutton" type="button" onClick={cancleClickHandler}>Cancle</button>
                </div>
            </figure>
        </div>
    );
};
export default Welcome;
