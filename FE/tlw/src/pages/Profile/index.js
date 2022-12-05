
import DropdownMenu from "../../components/Dropdown";
import "./index.scss"
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
        <>
            <BrowserView>
                <div className="Mypage" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }}>
                    <DropdownMenu />
                    <Profile />
                </div>
            </BrowserView>
            <MobileView>
                <div className="Mypage" style={{ background: `${themeColor.background}`, color: `${themeColor.color}` }}>
                    <DropdownMenu />
                    <Profile />
                </div>
            </MobileView>
        </>
    );
};
export default Home;

const Profile = () => {
    return (
        <div
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh"
            }}>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    padding: "20vh 10vw 16vh 14vw"
                }}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "white",
                        borderRadius: "20px"
                    }}>
                    <div className="profile">profile</div>
                </div>
            </div>
        </div >
    );
}
