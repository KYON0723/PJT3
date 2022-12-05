import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from "../../api";
import MusicComment from './components/MusicComment';
import MusicCommentInput from './components/MusicCommentInput';
import Pagination from "./components/Pagination";

const Home = () => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  const [musicDetail, setMusicDetail] = useState(
    { musicArtist: "", musicLikes: "", musicLyrics: "", commentList: [] }
  );

  const 파람스 = useParams();

  const onReviewEditHandle = (param) => {
    console.log(param);
  }

  useEffect(() => {
    apiClient
      .get("/musics", {
        headers: {
          // Authorization: accessToken
        },
        params: {
          musicSeq: 파람스.musicSeq,
          userSeq: 1
        }
      })
      .then((response) => {
        console.log(response.data)
        setMusicDetail(
          { musicArtist: response.data.musicArtist, musicLikes: response.data.musicLikes, musicLyrics: response.data.musicLyrics, commentList: response.data.commentList }
        )
      })
      .catch((error) => {
        console.log("요청 에러");
        console.log(error);
      });
  }, [파람스.musicSeq])

  return (
    <div className="body">
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      {
        musicDetail.commentList && musicDetail
          .commentList.slice(offset, offset + limit)
          .map((comment) => {
            console.log()
            return (
              <div
                style={{
                  width: "800px"
                }}>
                <MusicComment
                  commentSeq={comment.commentSeq}
                  userNick={comment.userNick}
                  comment={comment.comment}
                  commentDate={comment.commentDate}></MusicComment>
              </div>
            );
          })
      }
      <MusicCommentInput onClickHandle={onReviewEditHandle} />
      <footer>
        <Pagination
          total={musicDetail.commentList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};
export default Home;