/**
 * AxiosInstance 캡슐화
 * 테마 옵션 이름 정하기
 * @author 복성범
 */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  themedata: "default",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themedata = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, } = themeSlice.actions;
//액션이라 카는데 , 저 authSlice의 reducers 밑에 액션들임

export default themeSlice.reducer;
//스토어 입장에서는 슬라이스가 리듀서 관점이기 때문