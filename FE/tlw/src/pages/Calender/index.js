import Calendars from "./components/Calenders";
import Clock from "./components/Clock";
import NavBar from '../../components/Dropdown'
import './index.scss';
import { useSelector } from "react-redux";
import { themeDefault, theme1, theme2 } from "../../components/themeColor";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

const Home = () => {
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
    <div className="Calender" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }}>
      <BrowserView>
        <figure>
          <Clock />
          <NavBar />
          <Calendars themeColor = {themeColor}/>
        </figure>
      </BrowserView>
      <MobileView>
        <figure>
          <Clock />
          <NavBar />
          <Calendars themeColor = {themeColor}/>
        </figure>
      </MobileView>
    </div>
  );
};

export default Home;
