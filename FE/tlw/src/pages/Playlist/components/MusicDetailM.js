/* eslint-disable */
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { MusicsGetAPI } from "../../../api/Musics";
import { useSelector } from 'react-redux';
import Pagination from "./Pagination";
import { musicCommentPostAPI } from "../../../api/Comment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: '360px',
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

const Text = styled.div`
  width: 330px;
  margin: 5px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  width: 330px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid black;
  overflow: auto;
`;

const NickCom = styled.div`
  height: 25px;
  width: 250px;
  margin: 2px;
`;

const Date = styled.div`
  width: 80px;
  margin: 2px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;

  input {
    height: 23px;
    width: 250px;
    border-radius: 5px;
    padding: 0 10px;
    margin: 0 5px;
  }

  button {
    font-size: 13px;
    width: 60px;
    height: 23px;
    color: white;
    background-color: ${(props) => props.back};
    border: none;
    border-radius: 5px;
    margin: 0 5px;
  }
`;

// 모달창
const MusicDetail = ({ currentNum, back }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [comments, setComments] = useState([]);
  const [artist, setArtist] = useState('');
  const [name, setName] = useState('');
  const [release, setRelease] = useState('');
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
  const [isPost, setIsPost] = useState(false);

  // 음악 상세
  useEffect(() => {
    const temp = MusicsGetAPI(currentNum, token)

    const getData = (Data) => {
      Data.then((appData) => {
        setArtist(appData.musicArtist)
        setName(appData.musicName)
        setRelease(appData.musicRelease)
        setComments(appData.commentList)
        setIsPost(false)
      })
    }

    getData(temp)
  }, [currentNum, isPost])
  const [temp, setTemp] = useState('')

  const handleSubmit = () => {
    const data = {
      musicSeq: currentNum,
      comment: temp,
    }

    musicCommentPostAPI(data, token)
      .then((res) => {
        if (res) {
          setIsPost(true)
          setTemp('')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isEmpty = () => {
    if (temp.trim() === '') {
      alert('검색어를 입력 해 주세요.')

    } else {
      handleSubmit()
    }
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      isEmpty()
    }
  }


  return (
    <div>
      <button onClick={() => handleOpen()}>상세 정보</button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Icon><ImCancelCircle onClick={() => { handleClose(); }} /></Icon>

          <Main>
            <Text>가수 : {artist}</Text>
            <Text>제목 : {name}</Text>
            <Text>출시일 : {release}</Text>

            {comments.length ?
              <CommentList>
                {comments.slice(offset, offset + 5).map((item, index) => (
                  <Comment key={index}>
                    <NickCom>{item.userNick} - {item.comment}</NickCom> <Date>{item.commentDate.slice(2, 10)}</Date>
                  </Comment>
                ))}

                <Pagination total={comments.length} maxNum={5} page={page} setPage={setPage} />
              </CommentList>
              : <Text>아직 댓글이 없습니다.</Text>
            }

            <SearchBar back = {back}>
              <input onChange={(e) => setTemp(e.target.value)} onKeyPress={onEnter} value={temp}></input>
              <button onClick={() => isEmpty()}>등록</button>
            </SearchBar>
          </Main>

        </Box>
      </Modal>

    </div>
  );
};

export default MusicDetail;