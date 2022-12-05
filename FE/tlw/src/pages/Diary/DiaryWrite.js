import { useEffect, useState } from "react";
import { DiariesPostAPI, QuestionsGetAPI } from "../../api/Diary";
import './DiaryWrite.scss'
import { useSelector } from "react-redux";
import { themeDefault, theme1, theme2 } from "../../components/themeColor";
import Dropdown from '../../components/Dropdown'
import Carousel from "../../components/Carousel";
import CarouselM from "../../components/CarouselM";
import Nowlocation from "../../components/Nowlocation";
import Stt from "../../components/Stt"
import AudioPlayer from 'react-h5-audio-player';
import { BrowserView, MobileView } from "react-device-detect";
import { setFeel, setMusicList, setUser } from "../../store/slices/authSlice";
import {useDispatch} from "react-redux";

const Home = (props) => {
    const dispatch = useDispatch();
    const [diaryWeather, setDiaryWeather] = useState("sunny");
    const calYmd = useSelector((state) => state.auth.today);
    //const calYmd = '2022-11-12'
    const [questions, setQuestions] = useState([]);
    const [style, setStyle] = useState(false);
    const [input, setInput] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
    // const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmljayI6IuyEseuylCIsInVzZXJFbWFpbCI6ImJva3NiMUBuYXZlci5jb20iLCJ1c2VyU2VxIjoxOCwiaWF0IjoxNjY4NzQ0NDMyLCJleHAiOjE2NjkzNDkyMzJ9.rNb7iDYVWVgtYq0Ge-yC6qcOYevSYMqm2Gsgp-JG84Y`
    const [loadVoice, setLoadVoice] = useState(false);

    const searchCurrentSlide = (page) => {
        setCurrentSlide(page)
    }

    useEffect(() => {
        QuestionsGetAPI()
            .then((res) => {
                console.log(res)
                setQuestions(res)
                setLoadVoice(true)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onEdit = (targetId, newContent) => {
        setQuestions(questions.map(
            (question) => question.questionSeq === targetId
                ? {
                    ...question,
                    answer: newContent
                }
                : question
        ));
    }

    // onEdit 확인 useEffect(() => {     console.log(questions) }, [questions]) 11 /
    // 11 확인 완료

    const onClick = () => {
        if (style) {
            setStyle(false)
        } else {
            setStyle(true)
        }
    }



    const onClickSubmit = () => {
        const ABC = "A1." + questions[0].answer 
        + "A2." + questions[1].answer 

        const data = {
            // calYmd: "1999-01-24",
            calYmd: calYmd,
            diaryContent: ABC,
            diaryWeather: diaryWeather
        }

        DiariesPostAPI(data, token)
            .then((res) => {
                console.log(res.data)
                props.setMusicList(res.data.recommendList)
                dispatch(setFeel({feel: res.data.calEmotion}))
                dispatch(setMusicList({musicList: res.data.recommendList}))
            }).then(()=> {
                props.setSubmit(true)
            })
            .catch((err) => {
                console.log(err.response.status);
                if (err.response.status === "500") {
                    console.log("이미 일기를 썼구만 짜식아")
                }
            });
    }

    useEffect(() => {
        // console.log("인풋" + input) console.log("커렌트슬라이드" + currentSlide)
        setQuestions(questions.map(
            (question) => question.questionSeq === currentSlide + 1
                ? {
                    ...question,
                    answer: question.answer + input + " "
                }
                : question
        ))
    }, [input])

    //테마 설정 세트
    const theme = useSelector((state) => state.theme.themedata)
    const [themeColor, setThemeColor] = useState({})

    useEffect(() => {
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
        <>
            <BrowserView>
                < div className="DiaryWrite--Wrap" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }} > <Dropdown />
                    <Nowlocation setDiaryWeather={setDiaryWeather}/>
                    <button onClick={onClickSubmit}>
                    Submit!
                    </button>

                    {/* 플레이어 */}
                    {loadVoice ?
                        <AudioPlayer
                            style={{ display: 'none' }}
                            autoPlay
                            src={questions[currentSlide].questionVoice}
                            showSkipControls={false}
                            showJumpControls={false}
                        /> : ''}
                    {
                        questions && <Carousel searchCurrentSlide={searchCurrentSlide}>
                            {
                                questions.map((question, i) => {
                                    return (
                                        <div className='card' key={i}>
                                            <div className="inner">
                                                <div className="txt">
                                                    <h2>
                                                        Q. {question.questionText}

                                                        <div
                                                            style={{
                                                                right: "0",
                                                                position: "absolute"
                                                            }}>
                                                            <Stt key={i} setInput={setInput} />
                                                        </div>
                                                    </h2>
                                                    <div className="answer">
                                                        <h2>A.</h2>
                                                        <textarea
                                                            rows="1"
                                                            value={question.answer}
                                                            onChange={(e) => (onEdit(question.questionSeq, e.target.value))} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                    // 나중에 컴포넌트 하나 더 파주기 안 될듯..
                                })
                            }
                        </Carousel>
                    } </div>
            </BrowserView>
            <MobileView>
                < div className="DiaryWriteM--Wrap" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }} > <Dropdown />
                    <Nowlocation setDiaryWeather={setDiaryWeather} style={{zIndex: "-9999"}} />
                    <button onClick={onClickSubmit}>
                        Submit!
                    </button>

                    {/* 플레이어 */}
                    {loadVoice ?
                        <AudioPlayer
                            style={{ display: 'none' }}
                            autoPlay
                            src={questions[currentSlide].questionVoice}
                            showSkipControls={false}
                            showJumpControls={false}
                        /> : ''}
                    {
                        questions && <CarouselM searchCurrentSlide={searchCurrentSlide}>
                            {
                                questions.map((question, i) => {
                                    return (
                                        <div className='card' key={i}>
                                            <div className="inner">
                                                <div className="txt">
                                                    <h2>
                                                        Q. {question.questionText}

                                                        <i
                                                            className="fa-solid fa-pencil"
                                                            onClick={onClick}
                                                            style={{
                                                                right: "0",
                                                                position: "absolute"
                                                            }}></i>
                                                        <div
                                                            style={{
                                                                right: "0",
                                                                position: "absolute"
                                                            }}>
                                                            <Stt key={i} setInput={setInput} />
                                                        </div>
                                                    </h2>
                                                    <div className="answer">
                                                        <h2>A.</h2>
                                                        <textarea
                                                            rows="1"
                                                            value={question.answer}
                                                            onChange={(e) => (onEdit(question.questionSeq, e.target.value))} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                    // 나중에 컴포넌트 하나 더 파주기 안 될듯..
                                })
                            }
                        </CarouselM>
                    } </div>
            </MobileView>
        </ >
    );
}

export default Home;