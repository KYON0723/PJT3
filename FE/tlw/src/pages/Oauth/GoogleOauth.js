import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAccessToken, setAthenticated, setRefreshToken } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { googleTokenGetAPI } from "../../api/Oauth";

const GoogleOauth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const code = location
        .search
        .split("=")[1].split("&")[0];
    console.log(code)

    const data = {
        code: code,
    }

    useEffect(() => {

        googleTokenGetAPI(data)
            .then((res) => {
                console.log(res.data.accessToken)
                dispatch(setAthenticated(true))
                dispatch(setRefreshToken(`${res.data.refreshToken}`))
                dispatch(setAccessToken({ accessToken: res.data.accessToken }))
                navigate('/diary')
            })
            .catch((err) => {
                console.log(err);
            });
    }, [code])

    return (<> < h1 > 구글 로그인 중</h1> </>
    );
};

export default GoogleOauth;
