import { useEffect, useState } from "react";
import styled from "styled-components";
import Player from './components/Player'
import PlayerM from './components/PlayerM'
import SearchBox from './components/SearchBox'
import SearchBoxM from './components/SearchBoxM'
import NavBar from '../../components/Dropdown'
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import { themeDefault, theme1, theme2 } from "../../components/themeColor";
import { getTopMusic, getSearchMusic } from "../../api/Search";
import { playlistGetAPI } from "../../api/Playlists";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px; 
  justify-content: center;
  align-items: center;
`;

const ContentsM = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px; 
  justify-content: center;
  align-items: center;
`;

const Headers = styled.div`
  margin: 10px;
  font-size: 40px;
  font-weight: 500;
  text-shadow: 2px 2px 6px black;
`;

const Home = () => {
  const [music, setMusic] = useState([]);
  const [searchMusic, setSearchMusic] = useState([{}])
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeStamp, setTimeStamp] = useState('');
  const [line, setLine] = useState(3)
  const [searchType, setSearchType] = useState('title');
  const [tabNum, setTabNum] = useState(0);
  const [playType, setPlayType] = useState('searchMusic');
  const [currentNum , setCurrentNum] = useState();
  const [listNum, setListNum] = useState(0);
  const [tempList, setTempList] = useState('nothing');
  const [noneMusic, setNoneMusic] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
  const [title1, setTitle1] = useState('a');
  const [title2, setTitle2] = useState('a');

  useEffect(() => {
    if ((tempList !== 'nothing') && music.length) {
      let temp = music;
      temp[tabNum].playlistMusics = tempList
      setMusic(temp)
    }
  // eslint-disable-next-line
  },[tempList])

  // 테마 설정 세트
  const theme = useSelector((state) => state.theme.themedata)
  const [themeColor, setThemeColor] = useState({})

  useEffect(() => {
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

  // user PlayList
  useEffect(() => {
    const temp = playlistGetAPI(token)
    let tempLi = []

    const getData = (Data) => {
      Data.then((appData) => {
        for (let i = 0; i < appData.length; i++) {
          let tempLi2 = []

          for (let j = 0; j < appData[i].playlistMusics.length; j++) {
            let temp = {
              musicSeq: appData[i].playlistMusics[j].musicSeq,
              musicName: appData[i].playlistMusics[j].musicName,
              musicArtist: appData[i].playlistMusics[j].musicArtist,
            }
            tempLi2.push(temp)
          }
          tempLi.push({playSeq : appData[i].playSeq ,playlistMusics : tempLi2})
        }

        setMusic(tempLi)
      })
    }

    getData(temp)
    // eslint-disable-next-line
  }, [])

  // 처음 로딩시 탑 20 불러 옴
  useEffect(() => {
    const temp = getTopMusic()

    const getData = (Data) => {
      Data.then((appData) => {
        let tempLi = []
        // 검색 결과 있음
        if(appData.length) { 
          for (let i = 0; i < appData.length; i++) {
            let temp = {
              musicSeq: appData[i].musicSeq,
              musicName: appData[i].musicName,
              musicArtist: appData[i].musicArtist,
            }
            tempLi.push(temp)
          }
          setCurrentNum(tempLi[0].musicSeq)
          setTrackIndex(0)
          setTitle1(tempLi[0].musicArtist)
          setTitle2(tempLi[0].musicName)
          setNoneMusic(true)
          setIsSearch(true)
        }
        setSearchMusic(tempLi)
      })
    }

    if (!noneMusic) {
      getData(temp)
    }
  },[noneMusic])

  // 검색 결과 List
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    const temp = getSearchMusic(keyword, searchType)
    const getData = (Data) => {
      Data.then((appData) => {
        let tempLi = []
        // 검색 결과 있음
        if(appData.length) { 
          for (let i = 0; i < appData.length; i++) {
            let temp = {
              musicSeq: appData[i].musicSeq,
              musicName: appData[i].musicName,
              musicArtist: appData[i].musicArtist,
            }
            tempLi.push(temp)
          }
          setCurrentNum(tempLi[0].musicSeq)
          setTrackIndex(0)
          setTitle1(tempLi[0].musicArtist)
          setTitle2(tempLi[0].musicName)
          setIsSearch(true)
        }
        setSearchMusic(tempLi)
      })
    }

    if (noneMusic && keyword) {
      getData(temp)
    }
  },[keyword, isSearch, searchType, noneMusic])

 

  return (
    <div style={{ background: `${themeColor.background}`, color: `${themeColor.mycolor}`, border: `${themeColor.border}` }}>
      <Wrap>
        <NavBar/>
        <Headers>음악 검색</Headers>
        <BrowserView>
          <Contents>
            <Player 
              tabNum = {tabNum}
              setTabNum = {setTabNum}
              music = {music}
              searchMusic = {searchMusic}
              currentNum = {currentNum}
              setCurrentNum = {setCurrentNum}
              playType = {playType}
              setPlayType = {setPlayType}
              trackIndex = {trackIndex} 
              setTrackIndex = {setTrackIndex} 
              timeStamp = {timeStamp} 
              setTimeStamp = {setTimeStamp} 
              line = {line} 
              setLine={setLine}
              tempList = {tempList}
              setTempList = {setTempList}
              listNum = {listNum}
              setListNum = {setListNum}
              themeColor = {themeColor}
              noneMusic = {noneMusic}
              title1 = {title1}
              setTitle1 = {setTitle1}
              title2 = {title2}
              setTitle2 = {setTitle2}
            />

            <SearchBox 
              searchMusic = {searchMusic}
              setSearchMusic = {setSearchMusic}
              playType = {playType}
              setPlayType = {setPlayType}
              searchType = {searchType} 
              setSearchType = {setSearchType}
              trackIndex = {trackIndex} 
              setTrackIndex = {setTrackIndex} 
              themeColor = {themeColor}
              keyword = {keyword}
              setKeyword = {setKeyword}
              setIsSearch = {setIsSearch}
              noneMusic = {noneMusic}
              setTitle1 = {setTitle1}
              setTitle2 = {setTitle2}
            />
          </Contents>
        </BrowserView>
            
        <MobileView>
          <ContentsM>
            <PlayerM 
              tabNum = {tabNum}
              setTabNum = {setTabNum}
              music = {music}
              searchMusic = {searchMusic}
              currentNum = {currentNum}
              setCurrentNum = {setCurrentNum}
              playType = {playType}
              setPlayType = {setPlayType}
              trackIndex = {trackIndex} 
              setTrackIndex = {setTrackIndex} 
              timeStamp = {timeStamp} 
              setTimeStamp = {setTimeStamp} 
              line = {line} 
              setLine={setLine}
              tempList = {tempList}
              setTempList = {setTempList}
              listNum = {listNum}
              setListNum = {setListNum}
              themeColor = {themeColor}
              noneMusic = {noneMusic}
              title1 = {title1}
              setTitle1 = {setTitle1}
              title2 = {title2}
              setTitle2 = {setTitle2}
            />

            <SearchBoxM 
              searchMusic = {searchMusic}
              setSearchMusic = {setSearchMusic}
              playType = {playType}
              setPlayType = {setPlayType}
              searchType = {searchType} 
              setSearchType = {setSearchType}
              trackIndex = {trackIndex} 
              setTrackIndex = {setTrackIndex} 
              themeColor = {themeColor}
              keyword = {keyword}
              setKeyword = {setKeyword}
              setIsSearch = {setIsSearch}
              noneMusic = {noneMusic}
              setTitle1 = {setTitle1}
              setTitle2 = {setTitle2}
            />
          </ContentsM>
        </MobileView>
      </Wrap>
    </div>
  );
};
export default Home;
  