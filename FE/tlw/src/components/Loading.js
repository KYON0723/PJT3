/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import React from "react";
import "./Loading.scss";
import { useDispatch, useSelector } from "react-redux";
import { themeDefault, theme1, theme2 } from "../components/themeColor";
import { useEffect, useState } from "react";


const Loading = () => {

    // 테마 설정 세트
    const theme = useSelector((state) => state.theme.themedata)
    const [themeColor, setThemeColor] = useState({})

    useEffect(() => {
        console.log(theme)
        if (theme === "default") {
            setThemeColor(themeDefault)
        }
        else if (theme === "theme1") {
            setThemeColor(theme1)
        }
        else if (theme === "theme2") {
            setThemeColor(theme2)
        }
    }, [theme])
    // 테마 설정 세트 끝


    return (
        <div className="loading" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }}>
            <div className="title">
                로딩중<span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
            <img src="img/Moon.svg" className="Moon" alt="Moon" />
            <img src="img/spaceMan.png" className="SpaceMan" alt="SpaceMan" />
            <img src="img/rocket.png" className="Rocket" alt="rocket" />
            <img src="img/earth.png" className="Earth" alt="earth" />
        </div>
    );
}

export default Loading;