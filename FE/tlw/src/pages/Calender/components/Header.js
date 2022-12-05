import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MonthTitle = styled.h2`
  margin: 30px 10px;
`;

const Header = ({ currentMonth }) => {
  return (
    <Container>
      <LeftDiv>
        <MonthTitle>{format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월</MonthTitle>
      </LeftDiv>
    </Container>
  );
};

export default React.memo(Header);
