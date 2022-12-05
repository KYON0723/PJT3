/**
 * 폐기예정
 * @author 복성범
 */

import styled from "styled-components";

const ProgressBar = (props) => {
  // console.log(props.progressPercent)
  return (
    <Container>
      {/*%로 부모넓이의 1/5 씩 넓어짐*/}
      <Progress width={(props.progressPercent) * 100 + "%"} />
    </Container>
  );

};

const Container = styled.div`
  top: 2vh;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  margin: 50px auto;
  background-color: #eee;
  opacity: 0.5;
  width: 50vw;
  height: 1vh;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const Progress = styled.div`
  background-color: blue;
  width: ${props => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

export default ProgressBar;
