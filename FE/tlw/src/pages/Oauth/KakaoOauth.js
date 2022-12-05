import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAccessToken, setAthenticated, setNickName, setRefreshToken, setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { kakaoTokenGetAPI, kakaoTokenGetAPI2 } from "../../api/Oauth";
import Loading from "../../components/Loading";
import LoadingM from "../../components/LoadingM";
import { BrowserView, MobileView } from "react-device-detect";

const KakaoOauth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const code = location
        .search
        .split("=")[1];

    const data = {
        code: code,
    }


    useEffect(() => {
        kakaoTokenGetAPI(code)
            .then((res) => {
                console.log(res.data)
                dispatch(setAthenticated(true))
                dispatch(setRefreshToken(`${res.data.refreshToken}`))
                dispatch(setAccessToken({ accessToken: res.data.accessToken }))
                dispatch(setNickName({nickName: res.data.userNick }))
                navigate('/diary')
            })
            .catch((err) => {
                console.log(err);
            });
    }, [code])

    useEffect(() => {
        kakaoTokenGetAPI2(data)
            .then((res) => {
                console.log(res.data.accessToken)
                dispatch(setAthenticated(true))
                dispatch(setRefreshToken(`${res.data.refreshToken}`))
                dispatch(setAccessToken({ accessToken: res.data.accessToken }))
                navigate('/diary')
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [code])



    return (<>
        <BrowserView>
            <Loading />
        </BrowserView>
        <MobileView>
            <LoadingM />
        </MobileView>
    </ >);
};

export default KakaoOauth;