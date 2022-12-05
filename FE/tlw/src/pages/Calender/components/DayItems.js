import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";
import React from "react";
import styled from "styled-components";
import DayDetail from "./DayDetail";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contenr: center;
  align-items: center;
  text-align: start;npm
  margin: 10px 0;
`;

const RowsWrapper = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  width: 100%;
  height: 12vh;
  max-height: 80px;
  min-height: 60px;
`;

const DayBox = styled.div`
  width: 14%;
  height: 100%;
  font-size: 4px;

  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  padding: 3px;
  
  font-weight: bold;
  color: ${(props) => props.color};
  background-color: ${(props) => props.back};

  img {
    display: block;
    margin: auto;
    width: 45px;
    margin-top: 15px;
    border-radius: 50px;
    cursor: pointer;
  }
`;

const DayBoxTitle = styled.div`
  position: absolute;
  margin-left: 4px;
  margin-top: 4px;
`;

const DayItems = ({
  currentMonth,
  selectedDate,
  data,
  themeColor,
}) => {
  // 시작날짜
  const monthStart = startOfMonth(currentMonth);
  // 끝 날짜
  const monthEnd = endOfMonth(monthStart);
  // 첫째주의 시작 날짜
  const startDate = startOfWeek(monthStart);
  // 마지막 주의 끝 날짜
  const endDate = endOfWeek(monthEnd);
  // parse(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formatDate = "";
  let compareDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = format(day, "d");
      compareDate = format(day, "yyyy-MM-dd");

      let contentsCheck = false;
      let back = "";
      let img = false;
      let dayData = [];

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].calYmd === compareDate) {
            contentsCheck = true;
            // 감정 종류별로 색 분류 필요함
            if (data[i].calEmotion === '신난 하루') {
              back = 'yellow'
            }else if (data[i].calEmotion === '외로운 하루') {
              back = 'skyblue'
            }else if (data[i].calEmotion === '우울한 하루') {
              back = 'purple'
            }else if (data[i].calEmotion === '성가신 하루') {
              back = 'orange'
            }else if (data[i].calEmotion === '후회가 남는 하루') {
              back = 'gray'
            }else if (data[i].calEmotion === '억울한 하루') {
              back = 'green'
            }else if (data[i].calEmotion === '두려운 하루') {
              back = 'blue'
            }else if (data[i].calEmotion === '스트레스가 쌓인 하루') {
              back = 'red'
            }else if (data[i].calEmotion === '걱정이 많은 하루') {
              back = 'yellowgreen'
            }else if (data[i].calEmotion === '느긋한 하루') {
              back = 'greenyellow'
            }
            img = data[i].musicPicture;

            dayData = data[i];

            break;
          }
        }
      }

      const compareDay = isSameDay(day, selectedDate);

      days.push(
        !isSameMonth(day, monthStart) ? (
          <DayBox color="gray" key={day}>
            {formatDate}
          </DayBox>
        ) : (
          <DayBox
            key={day}
            color={i === 0 ? "#EE6969" : (i === 6 ? "blue" : "white")}
            back={contentsCheck ? `${back}` : (compareDay ? "#aed581" : "rgba(238, 238, 238, 0.24)")}
          >

            <DayBoxTitle>{formatDate}</DayBoxTitle>

            {img ? <DayDetail img={img} themeColor={themeColor} day = {compareDate} dayData = {dayData}/> : ""}
          </DayBox>
        )
      );
      day = addDays(day, 1);
    }
    rows.push(<RowsWrapper key={day}>{days}</RowsWrapper>);
    days = [];
  }

  return <Container>{rows}</Container>;
};

export default React.memo(DayItems);
