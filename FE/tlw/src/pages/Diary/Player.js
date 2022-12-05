import React from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

// 플레이어 관련
import AudioPlayer from 'react-h5-audio-player';
import { parse } from 'clrc';

const Album = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: center;
  align-items: center;

  width: 380px;
  height: 550px;
  background-color: white;
  // border: 1px solid black;
  border-radius: 20px;
  top: 10%;
  left: 30%;
`;

const Play = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: center;
  align-items: center;

  width: 370px;
  height: 550px;
  background-color: white;
  // border: 1px solid black;
  // border-radius: 20px;
  top: 10%;
  left: 30%;
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

const Player = ({music}) => {
  // 플레이어 관련 변수
  const player = useRef()
  const [lrc, setLrc] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentNum, setCurrentNum] = useState(1);
  const [timeStamp, setTimeStamp] = useState('');
  const [line, setLine] = useState(3)
  const focused = useRef(null);

  useEffect(() => {
    setCurrentNum(music.musicSeq)
    setLine(3)
    console.log(music)
  },[])

  useLayoutEffect(() => {
    if (focused.current !== null) {
      setLine(focused.current.firstChild.data)
    }
  });

  useEffect(() => {
    if (true) {
      fetch(`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_lyrics/${currentNum}.lrc`)
      .then ((response) => 
        response.text()
      )
      .then (data => {
        setLrc(parse(data));
        setLoading(true);
      });
    }
  },[currentNum])

  return (
    <div >
    {loading ?
      <Album>
        {/* 현재 가사 위치 계산 */}
        {lrc.map((item, index) => (
          (item.raw.substring(6, 7) === '.' ? (timeStamp === item.raw.substring(1, 6) ? <div key={index} style={{ display: 'none' }} ref={focused}>{index}</div> : "") : "")
        ))}

        <Playing>
          {/* 앨범 커버 */}
          <MusicImg><img src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music_Picture/${currentNum}.jpg`} alt="" /></MusicImg>
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
        <Play>
          <AudioPlayer
            // autoPlay/
            ref={player}
            // style={{backgroundColor: 'red'}}
            src={`https://gumi-d209.s3.ap-northeast-2.amazonaws.com/music/${currentNum}.mp3`}
            showSkipControls={true}
            showJumpControls={true}
            header={`${music.musicArtist} - ${music.musicName}` }
            listenInterval={500}
            onListen={() => {setTimeStamp(player.current.container.current.children[2].children[0].firstChild.firstChild.data);}}
          />
        </Play>
      </Album>
      : ''}
    </div>
  );
};

export default Player;
