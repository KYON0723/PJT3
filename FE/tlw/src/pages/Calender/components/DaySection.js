import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Sdiv = styled.div`;
  color: ${(props) => props.color};
  width: 14%;
  font-size: 12px;
  margin: 0 0 0 5px;
`;

const DaySection = () => {
  const days = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];
  return (
    <Container>
      {days.map((v, i) => (
        <Sdiv key={i} color={i === 0 ? "#EE6969" : (i === 6 ? "blue" : "white")}>{v}</Sdiv>
      ))}
    </Container>
  );
};

export default React.memo(DaySection);
