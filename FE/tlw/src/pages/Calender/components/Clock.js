import axios from "axios";
import { useEffect, useState } from "react"
import { setUser } from "../../../store/slices/authSlice";
import "./Clock.scss";
import { useDispatch } from "react-redux";

const Clock = () => {
    const [today, setToday] = useState("");
    const dispatch = useDispatch()
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
        dispatch(setToday( `${years}-${monthes}-${daies}`));
        setToday(`${dayofWeek}${daies} ${monthes} ${years}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000)
    }

    startTimer()

    const [geoReady, setGeoReady] = useState(false)
    const [tempCelcius, setTempCelcius] = useState()
    const [city, setCity] = useState("")
    // eslint-disable-next-line
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
            // eslint-disable-next-line
            let res = await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${state.center.lat}&lon=${state.center.lng}&appid=${process.env.REACT_APP_WEATER_API}`,
                    {},
                )
                .then(response => {
                    // console.log(response.data)
                    // console.log(response.data.name)
                    setCity(response.data.name)
                    // console.log(response.data.main.temp)
                    setTempCelcius((response.data.main.temp - 273.15).toFixed(1))
                    // console.log(response.data.weather[0].description)
                    setDescription(response.data.weather[0].description)
                    // console.log(response.data.weather[0].icon)
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
        // eslint-disable-next-line
    }, [state])

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation??? ???????????? ?????? ????????? ???????????????
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // ??????
                            lng: position.coords.longitude, // ??????
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
            // HTML5??? GeoLocation??? ????????? ??? ????????? ?????? ?????? ????????? ??????????????? ????????? ???????????????
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation??? ???????????? ?????????..",
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
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" width="160" />
            </div>

        </div>
    );
}

export default Clock;