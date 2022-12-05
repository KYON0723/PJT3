/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import axios from "axios";
import { useEffect, useState } from "react"
import "./Nowlocation.scss";

const Nowlocation = (props) => {

    const [today, setToday] = useState("");

    const currentTimer = () => {
        const date = new Date();

        const years = String(date.getFullYear()).padStart(2, "0");
        const monthes = date.getMonth() + 1;
        const daies = String(date.getDate()).padStart(2, "0");
        const week = [
            'Sunday, ',
            'Monday, ',
            'TuesDay, ',
            'WendsDay, ',
            'ThursDay, ',
            'FriDay, ',
            'SaturDay, '
        ];
        const dayofWeek = week[date.getDay()];

        setToday(`${dayofWeek}${daies} ${monthes} ${years}`)
        // props.setToday(`${years}-${monthes}-${daies}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000)
    }

    startTimer()

    const [geoReady, setGeoReady] = useState(false)
    const [tempCelcius, setTempCelcius] = useState()
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [icon, setIcon] = useState("")

    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    const _callApi = async () => {
        try {
            let res = await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${state.center.lat}&lon=${state.center.lng}&appid=${process.env.REACT_APP_WEATER_API}`,
                    {},
                )
                .then(response => {
                    // console.log(response.data)
                    // console.log(response.data.name)
                    // console.log(response.data.main.temp)
                    // console.log(response.data.weather[0].icon)
                    // console.log(response.data.weather[0].description)
                    setCity(response.data.name)
                    setTempCelcius((response.data.main.temp - 273.15).toFixed(1))
                    setDescription(response.data.weather[0].description)
                    props.setDiaryWeather(response.data.weather[0].description)
                    setIcon(response.data.weather[0].icon)
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (geoReady) {
            _callApi();
        }
    }, [state])

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                    setGeoReady(true);
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                }
            )
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
            }))
        }
    }, [])
    return (
        <div className="now-inform">
            <div className="date">
                {today}
                {/* Monday, 20 Aug 2018 */}
            </div>
            <div className="city">
                {city}
            </div>
            <div className="temp">
                {tempCelcius}&deg;
            </div>

            <div className="right-panel panel">
                <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="" width="160" />
            </div>

        </div>
    );
}

export default Nowlocation;