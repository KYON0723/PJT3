/* eslint-disable */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import { ReactSortable } from "react-sortablejs";
import { parse } from 'clrc';
import './PlayerM.css'
import MusicDetailM from './MusicDetailM'

const style = {
  bgcolor: "background.paper",
  width: '350px',
  height: '480px',
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: '10px 0 20px 0',
};

const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Headers = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 10px;

  button {
    font-size: 13px;
    width: 70px;
    height: 23px;
    color: white;
    background-color: ${(props) => props.back};
    border: none;
    border-radius: 5px;
    margin: 0 20px;
  }
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
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
  backgournd-color: blue;
  height: 50px;
  margin: 0 5px;
  
  .item {
    width: 320px;
    text-align: center;

    .red {
      font-size: 13px;
      color: red;
    }

    .normal {
      font-size: 10px;
    }
  }
`;

const MusicImg = styled.div`
  margin: 5px;

  img {
    width: 250px;
    height: 250px;
    border: 2px solid #ececec;
    border-radius: 10px;
  }
`;

const MusicList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 350px;

  border: 2px solid #ececec;
  border-radius: 5px;
  background-color: white;

  top: 5px;
  left: -5px;
`;

const Music = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  width: 335px;
  height: 23px;
  border-radius: 5px;
  text-align: start;
  margin: 2px;
  padding: 5px ;
  font-size: 12px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.back};
  font-size: 12px;
`;

const MusicWord = styled.div`
  display: flex;
  width: 315px;
  height: 22px;
  text-align: start;
  font-size: 13px;
  overflow: hidden;

  :hover {
    overflow: auto;
  }
`;

const NameTitle = styled.div`
  display: flex;
  width: auto;
  height: 26px;
  text-align: start;
  font-size: 12px;
  overflow: hidden;

  :hover {
    overflow: auto;
  }
`;

const MyButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  
  button {
    width: 120px;
    height: 25px;
    margin : 10px;
    border : none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.back};
    font-size: 12px;
  }
`;

const PlayListTab = styled.div`
  position: relative;
  top: -10px;
  left: -70px;

  button {
    font-size: 15px;
    height: 35px;
    width: 70px;
    border : none;
    border-radius: 10px 10px 0 0;
    background-color: ${(props) => props.color};
  }

  button:disabled {
    background-color: gray;
    color: white;
  }
  `;

// ????????????
const Player = ({
  tabNum,
  setTabNum,
  music, 
  currentNum, 
  setCurrentNum, 
  trackIndex, 
  setTrackIndex, 
  timeStamp, 
  setTimeStamp, 
  line, 
  setLine,
  tempList,
  setTempList,
  listNum,
  setListNum,
  themeColor,
  noneMusic,
  title1,
  setTitle1,
  title2,
  setTitle2,
}) => {
  const player = useRef()
  const [lrc, setLrc] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noneMusic) {
      fetch(`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_lyrics/${currentNum}.lrc`)
      .then ((response) => 
        response.text()
      )
      .then (data => {
        setLrc(parse(data));
        setLoading(true);
      });
    }
  },[currentNum, noneMusic])

  const [pList, setPList] = useState(false);

  const  handleClickPrevious = async () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? (`${music[listNum].playlistMusics.length}` === 0 ?  `${music[listNum].length}` - 1 : 0 ) : currentTrack - 1
    )
  };

  const handleClickNext = async () => {
    setTrackIndex((currentTrack) =>
      currentTrack < `${music[listNum].playlistMusics.length}` - 1 ? currentTrack + 1 : 0
    )
  };

  useEffect(() => {
    setCurrentNum(tempList[trackIndex].musicSeq)
    setTimeStamp(0);
    setLine(3)
  },[trackIndex])

  const handleDuplicate = () => {
    tempList = Array.from(new Set(tempList));
  }

  const handelDelete = musicSeq => {
    setTempList(tempList.filter(tempList => tempList.musicSeq !== musicSeq));
  }

  const focused = useRef(null);

  useLayoutEffect(() => {
    if (focused.current !== null) {
      setLine(focused.current.firstChild.data)
    }
  });

  return (
    <Box sx={style}>
      {loading?
      <Main>
        <Album>
          {/* ?????? ?????? ?????? ?????? */}
          {lrc.map((item, index) => (
            (item.raw.substring(6,7) === '.' ? (timeStamp === item.raw.substring(1,6) ? <div key={index} style={{display:'none'}} ref={focused}>{index}</div> : "") : "")
          ))}
          
          <Playing>
            {/* ?????? ?????? */}
            <MusicImg>
              {noneMusic ?
                <img src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_Picture/${currentNum}.jpg`} alt=''/>
                : <img src={'assets/image/noneMusic.jpg'} alt=''/>
              }
            </MusicImg>
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
            
          {/* ???????????? */}
          <AudioPlayer
            ref={player}
            autoPlay
            src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music/${currentNum}.mp3`}
            showSkipControls={true}
            showJumpControls={true}
            header={<NameTitle>{title1} - {title2}</NameTitle>}
            onClickPrevious={() => handleClickPrevious()}
            onClickNext={() => handleClickNext()}
            onEnded={() => handleClickNext()}
            listenInterval={500}
            onListen={() => {setTimeStamp(player.current.container.current.children[2].children[0].firstChild.firstChild.data);}}
          />
        </Album> 

        {/* ????????? ????????? */}
        {pList ?  
          <MusicList>
            <PlayListTab color = {`${themeColor.mycolor}`}>
              {music.map((item, idx) => (
                (tabNum === idx ? 
                  <button key={idx} disabled>{idx+1}???</button> 
                  : <button  key={idx} onClick={() => {setTabNum(idx); setTempList(music[idx].playlistMusics);}}>{idx+1}???</button>
                )
              ))}
            </PlayListTab>  

            <Headers back = {themeColor.mycolor}>PlayList {tabNum+1}</Headers>

            <ReactSortable 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height : '275px', 
                border: '2px solid #ececec', 
                borderRadius: '5px',
                marginBottom: '10px',
                overflow: 'auto',
              }} 
              group={{name: 'music'}} 
              onAdd={handleDuplicate()} 
              list={tempList} 
              setList={setTempList}
            >
              {tempList.map((item, index) => (
                <Music
                  key={item.musicSeq}
                  color={listNum === tabNum ? (item.musicSeq === currentNum ? "white" : "") : ""}
                  back={listNum === tabNum ? (item.musicSeq === currentNum ? `${themeColor.mycolor}` : '#eeeeee') : '#eeeeee'}
                >
                <MusicWord
                  onClick={() => {
                    setTrackIndex(index); 
                    setListNum(tabNum);
                    setTitle1(item.musicArtist)
                    setTitle2(item.musicName)
                  }}
                >
                  {item.musicArtist} - {item.musicName}
                </MusicWord>
                </Music>
              ))}
            </ReactSortable>
          </MusicList>
        : ""}

        <MyButton back = {themeColor.mycolor}>
          {pList ? <button onClick={() => setPList(false)}>PlayList Close</button>
          : <button onClick={() => {setPList(true); setTempList(music[0].playlistMusics)}}> PlayList Open</button>}
          <MusicDetailM currentNum={currentNum} back = {themeColor.mycolor}/>
        </MyButton>
      </Main>
      : ""}
    </Box>
  );
};

export default Player;