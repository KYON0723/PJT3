/**
 * 11 - 14 auth 리덕스 설정
 * @author 복성범
 */

import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import './Dropdown.scss';
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/slices/themeSlice";
import { setAthenticated, setAccessToken } from "../store/slices/authSlice";

const DropdownMenu = (props) => {
  const dispatch = useDispatch();

  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);


  const navigate = useNavigate();

  const onClickdiary = () => {
    navigate(`/diary`);
  };
  const onClickcalender = () => {
    navigate(`/calender`);
  };
  const onClickdchat = () => {
    navigate(`/chat`);
  };
  const onClickmypage = () => {
    navigate(`/profile`);
  };
  const onClicksearch = () => {
    navigate(`/search`);
  };
  const onClickplaylists = () => {
    navigate(`/playlist`);
  };

  const logoutClickHandler = () => {
    dispatch(setAthenticated(false));
    dispatch(setAccessToken(""));
    console.log("adios");
  };


  //요것이 테마를 결정하는 reux selector
  const item = useSelector((state) => state.theme.themedata);

  const themeDefaultClickHandler = () => {
    dispatch(setTheme("default"));
    // console.log("default")
  };
  const theme1ClickHandler = () => {

    dispatch(setTheme("theme1"));
    // console.log("theme1")
  };
  const theme2ClickHandler = () => {

    dispatch(setTheme("theme2"));
    // console.log("theme2")
  };
  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton onClick={myPageHandler} ref={myPageRef}>
          <i className="fas fa-bars"></i>
        </DropdownButton>

        <Menu isDropped={myPageIsOpen}>
          <Ul>
            <Li>
              <LinkWrapper onClick={onClickdiary}>일기 작성</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper onClick={onClickcalender}>나의 달력</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper onClick={onClickdchat}>채팅방</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper onClick={onClicksearch}>검색 페이지</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper onClick={onClickplaylists}>Play Lists</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="#1-3" onClick={logoutClickHandler}>로그아웃</LinkWrapper>
            </Li>
            <Li>
              <ul className="thema-option-wrapper">
                <li onClick={themeDefaultClickHandler}>
                  <div className="option" style={{ background: "#8C7BF4" }}></div>
                </li>
                <li onClick={theme1ClickHandler}>
                  <div className="option" style={{ background: "#683DF5" }}></div>
                </li>
                <li onClick={theme2ClickHandler}>
                  <div className="option" style={{ background: "#F79591" }}></div>
                </li>
              </ul>
            </Li>
          </Ul>
        </Menu>

      </DropdownContainer>
    </Wrapper>
  );
};

export default DropdownMenu;

const Wrapper = styled.div`
position: absolute;
top: 6vh;
right: 4vw;
font-size: 24px;
color: #fff;
z-index: 9;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: white;
  position: absolute;
  top: 52px;
  left: -100%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({
  isDropped }) =>
    isDropped &&
    css` opacity: 1;
    visibility: visible;
    transform: translate(-50 %, 0);
    left: 50 %;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li`
`;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: gray;
  cursor:pointer;

  &:hover {
    color: #8C7BF4;
    transition: transform 250ms ease-in-out;
  }

  &:after {
    display:block;
    content: '';
    border-bottom: solid 3px #FF9AE3;  
    transform: scaleX(0);
    transform-origin:  0% 50%;  
    transition: transform 250ms ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }

`;

