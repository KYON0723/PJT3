import styled from "styled-components";
import Box from "@mui/material/Box";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";

const style = {
  bgcolor: "background.paper",
  width: '500px',
  height: '630px',
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: '0 10px 0 10px',
};

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 10px;

  input {
    height: 23px;
    width: 300px;
    border-radius: 5px;
    padding: 0 10px;
    margin: 0 5px;
  }

  button {
    font-size: 13px;
    width: 70px;
    height: 23px;
    color: white;
    background-color: ${(props) => props.back};
    border: none;
    border-radius: 5px;
    margin: 0 5px;
  }
`;

const MusicList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 445px;
  margin: 0 10px;
`;

const SearchTab = styled.div`
  position: relative;
  top: -20px;
  left: -130px;

  button {
    font-size: 20px;
    height: 40px;
    width: 120px;
    border: none;
    border-radius: 10px 10px 0 0;
    background-color: ${(props) => props.color};
  }

  button:disabled {
    background-color: gray;
    color: white;
  }
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

// 검색박스
const SearchBox = ({
  searchMusic, 
  setSearchMusic, 
  playType, 
  setPlayType, 
  searchType, 
  setSearchType, 
  trackIndex, 
  setTrackIndex, 
  themeColor,
  keyword,
  setKeyword,
  setIsSearch,
  noneMusic,
  setTitle1,
  setTitle2,
}) => {
  const [temp, setTemp] = useState('')

  const isEmpty = () => {
    if (temp.trim() === '') {
      alert('검색어를 입력 해 주세요.')
    }
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      setKeyword(temp.trim())
      setIsSearch(false)

      isEmpty()
    }
  }

  return (
    <Box sx={style}>
      <SearchTab color = {`${themeColor.mycolor}`}>
        {searchType === 'title' ? <button disabled>제목</button> : <button onClick={() => setSearchType('title')}>제목</button>}
        {searchType === 'artist' ? <button disabled>가수</button> : <button onClick={() => setSearchType('artist')}>가수</button>}
      </SearchTab>

      <SearchBar back = {`${themeColor.mycolor}`}>
        <input onChange={(e) => setTemp(e.target.value)} onKeyPress={onEnter}></input>
        <button onClick={() => {setKeyword(temp.trim()); setIsSearch(false); isEmpty();}}>검색</button>
      </SearchBar>

      {noneMusic ?
      <MusicList>
        {searchMusic.length ?
        <ReactSortable
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '545px',
            border: '2px solid #ececec',
            borderRadius: '5px',
            marginBottom: '10px',
            overflow: 'auto',
          }}
          group = {{name: 'music', pull: 'clone', put: false}} 
          list={searchMusic} 
          setList={setSearchMusic} 
          >
          {searchMusic.map((item, index) => (
            <Music 
              key={item.musicSeq}
              color = {playType === 'searchMusic' ? (index === trackIndex ? 'white' : "") : ""}
              back = {playType === 'searchMusic' ? (index === trackIndex ? `${themeColor.mycolor}` : '#eeeeee') : '#eeeeee'}
              onClick={() => {
                setTrackIndex(index)
                setPlayType('searchMusic')
                setTitle1(item.musicArtist)
                setTitle2(item.musicName)
              }}
            > 
              <MusicWord>{item.musicArtist} - {item.musicName}</MusicWord>  
            </Music>
          ))}
        </ReactSortable>
        : <div>검색 결과가 없습니다.</div>}
      </MusicList>
      : ''}
    </Box>
  );
};

export default SearchBox;