/* eslint-disable */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import { ReactSortable } from "react-sortablejs";
import { parse } from 'clrc';
import './Player.css'

const style = {
  bgcolor: "background.paper",
  width: '450px',
  height: '650px',
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: '10px',
};

const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Headers = styled.div`
  margin: 10px;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
`;

const Playing = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  margin : 10px;
`;

const Lyric = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  height: 80px;

  margin: 0 10px;
  
  .item {
    width: 420px;
    text-align: center;

    .red {
      font-size: 18px;
      color: red;
    }

    .normal {
      font-size: 13px;
    }
  }
`;

const MusicImg = styled.div`
  margin: 10px;

  img {
    width: 320px;
    height: 320px;

    border-radius: 10px;
  }
`;

const MusicList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 250px;
  width: 520px;

  border: 1px solid black;
  border-radius: 5px;
  background-color: white;

  top: 40px;
  left: -30px;
`;

const Music = styled.div`
  width: 500px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: start;
  margin: 2px;
  padding: 0 0 0 10px ;
`;

const MyButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  button {
    width: 150px;
    height: 30px;
    margin : 10px;
    border-radius: 5px;
    background-color: #63b4f4;
  }
`;

// 플레이어
const Player = ({musicDetail, setMusicDetail, trackIndex, setTrackIndex, timeStamp, setTimeStamp, line, setLine}) => {
  const player = useRef()
  const [lrc, setLrc] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(musicDetail)

  useEffect(() => {
    if (true) {
      fetch(musicDetail.musicLyrics)
      .then ((response) => 
        response.text()
      )
      .then (data => {
        setLrc(parse(data));
        setLoading(true);
      });
    }
  },[musicDetail.musicLyrics])

  const [pList, setPList] = useState(false);

  // const handleClickPrevious = () => {
  //   setTrackIndex((currentTrack) =>
  //     currentTrack === 0 ? music.length - 1 : currentTrack - 1
  //   );
  //   setTimeStamp(0);
  //   setLine(3)
  // };

  // const handleClickNext = () => {
  //   setTrackIndex((currentTrack) =>
  //     currentTrack < music.length - 1 ? currentTrack + 1 : 0
  //   );
  //   setTimeStamp(0);
  //   setLine(3)
  // };

  const focused = useRef(null);

  useLayoutEffect(() => {
    if (focused.current !== null) {
      setLine(focused.current.firstChild.data)
    }
  });

  return (
    <Box sx={style}>
      {loading ?
        <Main>
          <Album>
              {/* 현재 가사 위치 계산 */}
              {lrc.map((item, index) => (
                (item.raw.substring(6,7) === '.' ? (timeStamp === item.raw.substring(1,6) ? <div key={index} style={{display:'none'}} ref={focused}>{index}</div> : "") : "")
              ))}
            
            <Playing>
              {/* 앨범 커버 */}
              <MusicImg><img src={musicDetail.musicPicture} alt=""/></MusicImg>
            </Playing>

            <Lyric>
              <div className="item">
                {lrc.map((item, index) => (
                  (item.raw.substring(6,7) === '.' ? 
                  (index == (line-1) ? <div key={index} className="normal">{item.raw.substring(10)}</div> 
                  : (index == line ? <div key={index} className="red">{item.raw.substring(10)}</div> 
                  : "")) 
                  : "")
                ))}
              </div>
            </Lyric>

            {/* 플레이어 */}
            <AudioPlayer
              ref={player}
              src={musicDetail.musicPath}
              showSkipControls={true}
              // showJumpControls={true}
              header={musicDetail.musicName}
              // onClickPrevious={handleClickPrevious}
              // onClickNext={handleClickNext}
              // onEnded={handleClickNext}
              listenInterval={500}
              onListen={() => {setTimeStamp(player.current.container.current.children[2].children[0].firstChild.firstChild.data);}}
            />
          </Album> 
         
        {/* 플레이 리스트 */}
        {/* {pList ?  
          <MusicList>
            <Headers>PlayList</Headers>
            <ReactSortable group={{name: 'music'}} list={music} setList={setMusic}>
              {music.map((item, index) => (
                <Music key={item.number} onClick={() => {setTrackIndex(index); setPlayType('music'); setTimeStamp(0); setLine(3);}}>
                  {item.name} {index === trackIndex ? "- Now Playing" :  ""}
                </Music>
              ))}
            </ReactSortable>
          </MusicList>
          : ""} */}

        <MyButton>
          {pList ? <button onClick={() => setPList(false)}>PlayList Close</button>
          : <button onClick={() => setPList(true)}> PlayList Open</button>}
        </MyButton>
      </Main>
      : ""}
    </Box>
  );
};

export default Player;