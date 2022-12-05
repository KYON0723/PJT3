import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CalGetAPI } from "../../api/Cal";
import Player from './components/Player'

const Home = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeStamp, setTimeStamp] = useState('');
  const [line, setLine] = useState(3)
  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
  const [musicDetail, setMusicDetail] = useState(
    {
      musicName: "",
      musicArtist: "",
      musicLyrics: "",
      musicPicture: "",
      musicPath: "",
    }
  );

  const [keyword, setKeyword] = useState('');
  const [musicNum, setMusicNum] = useState(1);

  useEffect(() => {
    const data = {
      calYmd: "2022-02-02"
    }
    CalGetAPI(data, token).then((res) => { console.log(res) })
  }, [])


  return (
    <div>
      <input onChange={(e) => setKeyword(e.target.value)} ></input>
      <button onClick={() => setMusicNum(keyword)}>검색</button>

      {musicNum}

      <Player
        musicDetail={musicDetail}
        setMusicDetail={setMusicDetail}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        timeStamp={timeStamp}
        setTimeStamp={setTimeStamp}
        line={line}
        setLine={setLine}
      />
    </div>
  );
};
export default Home;
