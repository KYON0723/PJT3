/**
 * AxiosInstance 캡슐화
 * 글자색 수정
 * @author 복성범
 */

import { blue, red } from "@mui/material/colors"

export const themeDefault =
{
    background: "linear-gradient(247.67deg, #8C7BF4 18.13%, #FF9AE3 85.61%)",
    color: "#fff",
    mycolor: "#8C7BF4",
    border: "2px solid gray",
    elementBackground: "white"
}

export const theme1 =
{
    background: "linear-gradient(180deg, #683DF5 0%, #2FCAD4 33.33%, #F6F4F7 64.58%, #F4E7C8 100%)",
    color: "#F4E7C8",
    mycolor: "#683DF5",
    border: "2px solid #F4E7C8",
    elementBackground: "white"
}

export const theme2 =
{
    background: "linear-gradient(0deg, #F79591 0%, #F7BEC4 37.5%, #EEEDE6 76.56%, #CEDAE8 100%)",
    color: "#F79591",
    mycolor: "#F79591",
    border: "2px solid #CEDAE8",
    elementBackground: "white"
}

export const emotionTheme = {
    sad: red,
    happy: blue,
}