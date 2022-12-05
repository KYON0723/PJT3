/* eslint-disable */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { ReactSortable } from "react-sortablejs";
import AudioPlayer from 'react-h5-audio-player';
import { parse } from 'clrc';
import { useSelector } from "react-redux";
import { CalDetailGetAPI } from "../../../api/Cal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: '380px',
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Icon = styled.div`
  position: absolute;
  left: 95%;
  margin-left: -10px;
  margin-top: -15px;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: center;
  align-items: center;
`;

const Playing = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  margin : 5px;
`;

const Lyric = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backgournd-color: blue;
  height: 60px;
  margin: 5px;
  
  .item {
    width: 360px;
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

    border-radius: 10px;
  }
`;

const MusicList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;

  top: 17%;
  left: 2%;
`;

const DiaryContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  top: 10%;

  height: 300px;
  width: 360px;
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
    background-color: ${(props) => props.back};
  }
`;

const Headers = styled.div`
  margin: 10px;
`;

const Music = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 335px;
  height: 25px;
  border-radius: 5px;
  text-align: start;
  margin: 3px;
  padding: 5px ;
  color: ${(props) => props.color};
  background-color: ${(props) => props.back};
  font-size: 13px;
  white-spaceL nowrap;
  overflow: hidden;
`;


// 모달창
const DayDetail = ({ img, themeColor, day, dayData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const player = useRef()

  const [music, setMusic] = useState([{}]);

  const [trackIndex, setTrackIndex] = useState(0);
  const [timeStamp, setTimeStamp] = useState('');
  const [pList, setPList] = useState(false);
  const [myDiary, setMyDiary] = useState(false);

  const [lrc, setLrc] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentNum, setCurrentNum] = useState(1);
  const [line, setLine] = useState(3)
  const [emotion, setEmotion] = useState('');
  const [diaryContents, setDiaryContents] = useState('');
  const [diaryWeather, setDiaryWeather] = useState('');
  const [loadData, setLoadData] = useState(false);
  const [backC, setBackC] = useState();
  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`

  const isNum = (string) => {
    return !isNaN(Number(string))
  }


  const notMusic = (() => {
    let cNum = ''

    for (let i=0;i<5;i++) {
      const tt = dayData.musicPicture.slice(-5-i,-4-i)
      
      if (isNum(tt)) {
        cNum = tt + cNum

      }else{
        break
      }
    }
    return cNum
  })

  useEffect(() => {
      const data = {
        calYmd: day
      }
      const temp = CalDetailGetAPI(data, token)

      const getData = (Data) => {
        Data.then((appData) => {
          setMusic(appData.recommendList)
          setEmotion(appData.calEmotion)
          setDiaryContents(appData.diaryContents)
          setDiaryWeather(appData.diaryWeather)
        }).then(() => {
          
        })
      }

    if (!loadData) {
      getData(temp)
      setLoadData(true)
    }
  },[loadData])

  useEffect(() => {
    if (loadData) {
      let Num = ''
      if (currentNum) {
        Num = currentNum
      }else {
        Num = notMusic()
      }

      fetch(`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_lyrics/${Num}.lrc`)
      .then ((response) => 
        response.text()
      )
      .then (data => {
        setLrc(parse(data));
        setLoading(true);
      });
    }
  },[currentNum, loadData])

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? music.length - 1 : currentTrack - 1
    );
  };
  
  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < music.length - 1 ? currentTrack + 1 : 0
    );
  };

  useEffect(() => {
    setCurrentNum(music[trackIndex].musicSeq);
    setTimeStamp(0);
    setLine(3);
  },[trackIndex])

  const focused = useRef(null);

  useLayoutEffect(() => {
    if (focused.current !== null) {
      setLine(focused.current.firstChild.data)
    }
  });

  return (
    <div>
      <img src={img} alt='' onClick={handleOpen} />
      { loading && loadData ?
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Icon><ImCancelCircle onClick={() => {handleClose(); setPList(false); setMyDiary(false); }} /></Icon>

          <Main>
            <Album>
              {/* 현재 가사 위치 계산 */}
              {lrc.map((item, index) => (
                (item.raw.substring(6, 7) === '.' ? (timeStamp === item.raw.substring(1, 6) ? <div key={index} style={{ display: 'none' }} ref={focused}>{index}</div> : "") : "")
              ))}

              <Playing>
                {/* 앨범 커버 */}
                <MusicImg>
                  {currentNum ?
                    <img src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_Picture/${currentNum}.jpg`} alt="" />
                  : <img src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_Picture/${notMusic()}.jpg`} alt="" />
                  }
                </MusicImg>
              </Playing>


              <Lyric>
                <div className="item">
                  {lrc.map((item, index) => (
                    (item.raw.substring(6, 7) === '.' ?
                      (index == (line - 1) ? <div key={index} className="normal">{item.raw.substring(10)}</div>
                        : (index == line ? <div key={index} className="red">{item.raw.substring(10)}</div>
                          : ""))
                      : "")
                  ))}
                </div>
              </Lyric>

              {/* 플레이어 */}
              <AudioPlayer
                autoPlay
                ref={player}
                src={
                  ( currentNum ? `https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music/${currentNum}.mp3` 
                  : `https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music/${notMusic()}.mp3`)
                }
                showSkipControls={true}
                showJumpControls={true}
                header={`${music[trackIndex].musicArtist} - ${music[trackIndex].musicName}` }
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
                <Headers>PlayList</Headers>
                <ReactSortable 
                  style={{ 
                    width: '345px', 
                    minHeight : '30px', 
                    border: '2px solid #ececec', 
                    borderRadius: '5px',
                    marginBottom: '10px'
                  }}                 
                  list={music} 
                  setList={setMusic}
                >
                  {music.map((item, index) => (
                    <Music 
                      key={item.musicSeq}
                      color={(item.musicSeq === currentNum) || ((item.musicSeq == notMusic()) && !currentNum) ? "white" :  ""}
                      back={(item.musicSeq === currentNum) || ((item.musicSeq == notMusic()) && !currentNum) ? `${themeColor.mycolor}` : '#e9dbdb'}
                      onClick={() => {
                        setTrackIndex(index)
                      }}
                    >
                      {item.musicArtist} - {item.musicName}
                    </Music>
                  ))}
                </ReactSortable>
              </MusicList>
              : ""}
          </Main>

          {myDiary ?
            <DiaryContent back={backC}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>기분 : {emotion}</div>
                <div>날씨 : {diaryWeather}</div>
                <div>일기 : {diaryContents}</div>
              </Typography>
            </DiaryContent>
            : ""}

          <MyButton back = {`${themeColor.mycolor}`}>
            {pList ? <button onClick={() => setPList(false)}>PlayList Close</button>
              : <button onClick={() => setPList(true)}> PlayList Open</button>}

            {myDiary ? <button onClick={() => setMyDiary(false)}>Diary Close</button>
              : <button onClick={() => setMyDiary(true)}> Diary Open</button>}
          </MyButton>
        </Box>
      </Modal>
      : ""}
    </div>
  );
};

export default DayDetail;