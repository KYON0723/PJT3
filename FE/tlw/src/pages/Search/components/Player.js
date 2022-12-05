/* eslint-disable */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import { ReactSortable } from "react-sortablejs";
import { parse } from 'clrc';
import { AiFillDelete } from 'react-icons/ai'
import MusicDetail from './MusicDetail'
import { useSelector } from "react-redux";
import { playlistPutAPI } from "../../../api/Playlists";

const style = {
  bgcolor: "background.paper",
  width: '400px',
  height: '630px',
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: '0 10px 0 10px',
};

const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 10px;
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
  backgournd-color: blue;
  height: 65px;
  margin: 0 5px;
  
  .item {
    width: 350px;
    text-align: center;

    .red {
      font-size: 15px;
      color: red;
    }

    .normal {
      font-size: 12px;
    }
  }
`;

const MusicImg = styled.div`
  margin: 10px;

  img {
    width: 300px;
    height: 300px;
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

  width: 460px;

  border: 2px solid #ececec;
  border-radius: 5px;
  background-color: white;
  
  top: -10px;
  left: -40px;
`;

const Music = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  width: 420px;
  height: 23px;
  border-radius: 5px;
  text-align: start;
  margin: 2px;
  padding: 5px ;
  color: ${(props) => props.color};
  background-color: ${(props) => props.back};
  font-size: 13px;
`;

const MusicWord = styled.div`
  display: flex;
  width: 400px;
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


const DelIcon = styled.div`
  display: flex;
`;

const MyButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  
  button {
    width: 150px;
    height: 30px;
    margin : 10px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.back};
    font-size: 15px;
  }
`;

const PlayListTab = styled.div`
  position: relative;
  top: -10px;
  left: -110px;

  button {
    font-size: 18px;
    height: 40px;
    width: 80px;
    border : none;
    border-radius: 10px 10px 0 0;
    background-color: ${(props) => props.color};
  }

  button:disabled {
    background-color: gray;
    color: white;
  }
  `;

// 플레이어
const Player = ({
  tabNum,
  setTabNum,
  music, 
  searchMusic, 
  currentNum, 
  setCurrentNum, 
  playType, 
  setPlayType, 
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
    if (playType === 'music') {
      setTrackIndex((currentTrack) =>
        currentTrack === 0 ? (`${music[listNum].playlistMusics.length}` === 0 ?  `${music[listNum].length}` - 1 : 0 ) : currentTrack - 1
      )
      
    } else {
      setTrackIndex((currentTrack) =>
        currentTrack === 0 ? `${searchMusic.length}`- 1 : currentTrack - 1
      )
    }
  };

  const handleClickNext = async () => {
    if (playType === 'music') {
      setTrackIndex((currentTrack) =>
        currentTrack < `${music[listNum].playlistMusics.length}` - 1 ? currentTrack + 1 : 0
      )
    
    } else {
      setTrackIndex((currentTrack) =>
        currentTrack < `${searchMusic.length}` - 1 ? currentTrack + 1 : 0
      )
    }
  };

  useEffect(() => {
    if (playType === 'music') {
      setCurrentNum(tempList[trackIndex].musicSeq)
      
    }else {
      setCurrentNum(searchMusic[trackIndex].musicSeq)
    }

    setTimeStamp(0);
    setLine(3)
  },[trackIndex, playType])

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

  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`

  const saveList = () => {
    let tempLi = []

    
    for (let i=0;i<music[tabNum].playlistMusics.length; i++) {
      let temp = {
        musicSeq: music[tabNum].playlistMusics[i].musicSeq,
        playMusicOrder: i+1,
      }

      tempLi.push(temp)
    }

    let Data = {
      playSeq: music[tabNum].playSeq,
      data : tempLi
    }
    const res = playlistPutAPI(Data, token) 

    if (res) {
      alert('저장 되었습니다.')
    }
  }

  return (
    <Box sx={style}>
      {loading?
      <Main>
        <Album>
          {/* 현재 가사 위치 계산 */}
          {lrc.map((item, index) => (
            (item.raw.substring(6,7) === '.' ? (timeStamp === item.raw.substring(1,6) ? <div key={index} style={{display:'none'}} ref={focused}>{index}</div> : "") : "")
          ))}
          
          <Playing>
            {/* 앨범 커버 */}
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
            
          {/* 플레이어 */}
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

        {/* 플레이 리스트 */}
        {pList ?  
          <MusicList>
            <PlayListTab color = {`${themeColor.mycolor}`}>
              {music.map((item, idx) => (
                (tabNum === idx ? 
                  <button key={idx} disabled>{idx+1}번</button> 
                  : <button  key={idx} onClick={() => {setTabNum(idx); setTempList(music[idx].playlistMusics);}}>{idx+1}번</button>
                )
              ))}
            </PlayListTab>  

            <Headers back = {themeColor.mycolor}>PlayList {tabNum+1} <button onClick={() => saveList()}>저장</button></Headers>

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
                  color={playType === 'music' ? (listNum === tabNum ? (item.musicSeq === currentNum ? "white" : "") : "") : ""}
                  back={playType === 'music' ? (listNum === tabNum ? (item.musicSeq === currentNum ? `${themeColor.mycolor}` : '#eeeeee') : '#eeeeee') : '#eeeeee'}
                >
                <MusicWord
                  onClick={() => {
                    setTrackIndex(index); 
                    setPlayType('music');
                    setListNum(tabNum);
                    setTitle1(item.musicArtist)
                    setTitle2(item.musicName)
                  }}
                >
                  {item.musicArtist} - {item.musicName}
                </MusicWord>
                <DelIcon><AiFillDelete onClick={() => handelDelete(item.musicSeq)}/></DelIcon>
                </Music>
              ))}
            </ReactSortable>
          </MusicList>
        : ""}

        <MyButton back = {themeColor.mycolor}>
          {pList ? <button onClick={() => setPList(false)}>PlayList Close</button>
          : <button onClick={() => {setPList(true); setTempList(music[0].playlistMusics)}}> PlayList Open</button>}
          <MusicDetail currentNum={currentNum} back = {themeColor.mycolor}/>
        </MyButton>
      </Main>
      : ""}
    </Box>
  );
};

export default Player;