/**
 * AxiosInstance 캡슐화
 * 토큰 받을 준비
 * @author 복성범
 */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // authenticated: false,
    authenticated: true, 
    // accessToken: "",
    // accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmljayI6IuyEseuylCIsInVzZXJFbWFpbCI6ImJva3NiMUBuYXZlci5jb20iLCJ1c2VyU2VxIjoxOCwiaWF0IjoxNjY4NzI4NTgxLCJleHAiOjE2NjkzMzMzODF9.uvYjXeNddbvwwuOXYoBIno0UDDPC6mtuiRtkvffVzBQ",
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmljayI6Iu2YuO2YlSIsInVzZXJFbWFpbCI6ImpoaDY4MjJAbmF2ZXIuY29tIiwidXNlclNlcSI6MTcsImlhdCI6MTY2ODgzODc0MiwiZXhwIjoxNjY5NDQzNTQyfQ.mktRf3Db2o4hqz_LULG6VxKhfF0tsXlVBvTrdJd7bb4',
    refreshToken: "",
    today: "2022-11-01",
    nickName: "구씨",
    feel: "우울한 하루",

    musicList: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
        setToday: (state, action) => {
            state.today = action.payload.today;
        },
        setNickName: (state, action) => {
            state.nickName = action.payload.nickName;
        },
        setFeel: (state, action) => {
            state.feel = action.payload.feel;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload.refreshToken;
        },
        setMusicList: (state, action) => {
            state.musicList = action.payload.musicList;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAthenticated, setRefreshToken, setAccessToken, setMusicList, setToday, setNickName, setFeel } = authSlice.actions; //액션이라 카는데 , 저 authSlice의 reducers 밑에 액션들임

export default authSlice.reducer; //스토어 입장에서는 슬라이스가 리듀서 관점이기 때문
