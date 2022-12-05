/**
 * 11 - 14 토큰 없는 사람 로그인 페이지로 이동
 * @author 복성범
 */

import { Navigate, Route, Routes } from "react-router-dom";
import Mypage from "./pages/Mypage";
import Chat from "./pages/Chat";
import Diary from "./pages/Diary";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MusicDetail from "./pages/Musics/MusicDetail";
import MusicSearch from "./pages/Musics/MusicSearch";
import Playlist from "./pages/Playlist";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender";
import Error from "./pages/Error"
import Test from './pages/Test'
import Search from './pages/Search'
import KakaoOauth from "./pages/Oauth/KakaoOauth";
import GoogleOauth from "./pages/Oauth/GoogleOauth";
import { useSelector } from "react-redux";

function App() {
    const authenticated = useSelector((state) => state.auth.authenticated);
    const NickName = useSelector((state) => state.auth.nickName);
    const RoomName = useSelector((state) => state.auth.feel);
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/chat" element={authenticated ? <Chat /> : <Navigate to="/" />}></Route>
            {/* <Route path="/login" element={authenticated ? <Navigate to="/diary" /> : <Login />}></Route> */}
            <Route path="/diary" element={authenticated ? <Diary /> : <Navigate to="/" />}></Route>
            <Route path="/search" element={authenticated ? <Search /> : <Navigate to="/" />}></Route>
            <Route path="/mypage" element={authenticated ? <Mypage /> : <Navigate to="/" />}></Route>
            <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/" />}></Route>
            <Route path="/playlist" element={authenticated ? <Playlist /> : <Navigate to="/" />}></Route>
            <Route path="/calender" element={authenticated ? <Calender /> : <Navigate to="/" />}></Route>

            <Route path="/test" element={<Test />}></Route>

            <Route path="/musics">
                <Route index element={<MusicSearch />}></Route>
                <Route path=":musicSeq" element={<MusicDetail />}></Route>
            </Route>
            <Route path="/user/login/kakao" element={<KakaoOauth />}></Route>
            <Route path="/user/login/google" element={<GoogleOauth />}></Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default App;
