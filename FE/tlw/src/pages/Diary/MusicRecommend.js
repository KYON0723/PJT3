import {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import DropdownMenu from "../../components/Dropdown";
import "./MusicRecommend.scss";
import {useNavigate} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";
import Player from "./Player";
import {useSelector} from "react-redux";
import Carousel from "../../components/CarouselMR";
import { themeDefault, theme1, theme2 } from "../../components/themeColor";

const MusicRecommend = ({musicList}) => {
    // 로딩 페이지 로딩 실패 페이지 로딩 성공 페이지! const [loading, setLoading] = useState(false);
    // const [loadingSucceded, setLoadingSucceded] = useState(false);
    const navigate = useNavigate();

    const onClickcalender = () => {
        navigate(`/calender`);
    };

    const [active, setActive] = useState(0);

    const NextSlide = () => {
        if (active >= musicList.length - 1) {
            setActive(0)
        } else {
            setActive(active + 1)
        }
    };
    // Prev 버튼 클릭 시
    const PrevSlide = () => {
        if (active == 0) {
            setActive(musicList.length)
        } else {
            setActive(active - 1)
        }
    };

    const MAX_VISIBILITY = 3
    const FEEL = `${useSelector((state) => state.auth.feel)}의 당신을 위해`
    console.log(useSelector((state) => state.auth.feel))

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
                <div className="MusciRecommend" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }}>
                <div className="feel">{FEEL}</div>
                    {
                        musicList
                            ? <> 
                                < DropdownMenu />

                                <Carousel>
                                    {
                                        musicList.map((music, index) => (
                                                <Player music={music} key={index}/>
                                        ))
                                    }
                                </Carousel>

                                <button type="button" onClick={onClickcalender} className="done-button">Done</button>
                            </>
                            : <Loading/>
                    }
                </div>
            </BrowserView>
            <MobileView>
                <figure>
                    {
                        musicList
                            ? <> < DropdownMenu /> <div className="nav left" onClick={PrevSlide}>
                                    <i className="fa-sharp fa-solid fa-chevron-left"></i>
                                </div>

                                <div className="nav right" onClick={NextSlide}>
                                    <i className="fa-sharp fa-solid fa-chevron-right"></i>
                                </div>
                                <button type="button" onClick={onClickcalender}>Done</button>

                            </>
                            : <Loading/>
                    }
                </figure>
            </MobileView>
        </>
    );
};
export default MusicRecommend;
