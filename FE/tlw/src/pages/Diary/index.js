import { useState } from "react";

import "./index.scss";
import MusicRecommend from "./MusicRecommend";
import DiaryWrite from "./DiaryWrite";
import Welcome from "./Welcome";
import { BrowserView, MobileView } from "react-device-detect";

const Home = () => {
    const [submit, setSubmit] = useState(false);
    const [start, setStart] = useState(true);
    const [musicList, setMusicList] = useState([]);

    console.log(start, submit)
    return (
        <div >
            <BrowserView>
                {
                    start
                        ? <Welcome setStart={setStart} setSubmit={setSubmit} setMusicList={setMusicList}/>
                        : submit
                            ? <MusicRecommend musicList={musicList}/>
                            : <DiaryWrite setSubmit={setSubmit} setMusicList={setMusicList} />
                }
            </BrowserView>
            <MobileView>
                {
                    start
                        ? <Welcome setStart={setStart} />
                        : submit
                            ? <MusicRecommend />
                            : <DiaryWrite setSubmit={setSubmit} setMusicList={setMusicList} />
                }
            </MobileView>
        </div>
    );
};
export default Home;
