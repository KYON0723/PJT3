/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import React, { useState } from "react";
import styled from "styled-components";
import "./Watch.scss";

const Watch = (props) => {
    const Wrapper = styled.div`
    color: ${props.color};
    position: absolute;  
    left: ${props.left}%;
    top: ${props.top}%;
    transform: translate(-50%, -50%);
`;
    const [today, setToday] = useState("");

    const currentTimer = () => {
        const date = new Date();

        const years = String(date.getFullYear()).padStart(2, "0");
        const monthes = date.getMonth() + 1;
        const daies = String(date.getDate()).padStart(2, "0");
        const week = [
            '일',
            '월',
            '화',
            '수',
            '목',
            '금',
            '토'
        ];
        const dayofWeek = week[date.getDay()];

        setToday(`${years} . ${monthes} . ${daies} . ${dayofWeek}`)
        props.setToday(`${years}-${monthes}-${daies}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000)
    }

    startTimer()

    return (
        <Wrapper>
            {today}
        </Wrapper>
    );
}

// 기본값 정의
Watch.defaultProps = {
    color: "white",
    left: 50,
    top: 50,
}


export default Watch;

