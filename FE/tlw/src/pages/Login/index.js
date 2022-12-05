import {BrowserView, MobileView} from "react-device-detect";
import Login from "./components/Login";
import "./index.scss";
const Home = () => {
    return (
        <div className="login">

            <BrowserView>
                <h1>How Are You?</h1>

                <section>
                    <article className="sky">
                        <img src="img/Sun.png" className="sun" alt="sun"/>
                        <img src="img/Moon.png" className="moon" alt="moon"/>
                    </article>

                    <article className="title">
                        <img src="img/LogoTitleBlack.png" className="logoTitleBlack" alt="blacktitle"/>
                        <img src="img/LogoTitleWhite.png" className="logoTitleWhite" alt="whitetitle"/>
                    </article>
                        <Login/>

                </section>
            </BrowserView>
            <MobileView>
                <img
                    src="img/Logo.png"
                    style={{
                        height: "45vh",
                        position: "absolute",
                        left: "50%",
                        transform: "translate(-50% )"
                    }}
                    alt="blacktitle"/>
                    <Login/>
            </MobileView>

        </div>
    );
};
export default Home;
