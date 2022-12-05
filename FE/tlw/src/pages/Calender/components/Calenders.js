import React, { useState, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import "./Calenders.scss";
import { useSelector } from "react-redux";
import { CalGetAPI, } from "../../../api/Cal";

// 달력
import { addMonths, subMonths } from "date-fns";
import DayItems from "./DayItems";
import DaySection from "./DaySection";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: center;
  align-items: center;
  
  margin-top: 20px;
`;

const Body = styled.div`
  width: 100%;
`;

const Month = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: center;
  align-items: center;
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  cursor: pointer;
`;

const Calendars = ({themeColor}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`
  const [diaryData, setDiaryData] = useState([]);

  // 날짜 변환
  const getDate = ((date) => {
    let temp = date.getMonth() + 1;
    let month = temp;
    if (temp < 10) {
      month = `0${temp}`;
    }

    let temp2 = date.getDate();
    let day = temp2;
    if (temp2 < 10) {
      day = `0${temp2}`;
    }
    return `${date.getFullYear()}-${month}-${day}`
  })

  useEffect(() => {
    const date = getDate(currentMonth)
    const today = date
    const data = {
      calYmd: today
    }
    const temp = CalGetAPI(data, token)

    const getData = (Data) => {
      Data.then((appData) => {
        if (appData.length) {
          setDiaryData(appData)
        }
      })
    }
    getData(temp)
  }, [currentMonth, token])

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setLoading(false);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setLoading(false);
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return ( 
    <Container> 
      {loading ? 
        <div>로 딩 중</div>
      : <Body>
          <Month>
            <ItemDiv>
              <AiOutlineLeft onClick={prevMonth} />
            </ItemDiv>

            <Header currentMonth={currentMonth} />

            <ItemDiv>
              <AiOutlineRight onClick={nextMonth} />
            </ItemDiv>
          </Month>

          <div className="wrapper" 
            style={{ 
              width: "100%", 
              maxWidth: "800px", 
              minWidth: "375px",
            }}>
            <DaySection />

            <DayItems
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateClick={onDateClick}
              setLoading={setLoading}
              data={diaryData} 
              themeColor = {themeColor}
            />
          </div>
        </Body>
      } 
    </Container>
  );
};

export default Calendars;