import React, {useEffect, useRef, useState} from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useDispatch, useSelector} from "react-redux";
import {ChatPostAPI} from "../../api/Chat";
import {themeDefault, theme1, theme2} from "../../components/themeColor";
import NavBar from '../../components/Dropdown'
import ChatBubble from "./components/chatBubble";
import ChatBubbleOther from "./components/chatBubbleOther";
import "./index.scss";

const ROOM_SEQ = 1;

const Home = ({RoomName, NickName}) => {
    const client = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState(useSelector((state) => state.auth.nickName));

    

    useEffect(() => {
        connect();

        return() => disconnect();
    }, []);

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: "wss://k7d209.p.ssafy.io:8443/ws-stomp", // 웹소켓 서버로 직접 접속
            // webSocketFactory: () => new SockJS("/ws-stomp"),  proxy를 통한 접속
            connectHeaders: {
                "auth-token": "spring-chat-auth-token"
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                subscribe();
            },
            onStompError: (frame) => {
                console.error(frame);
            }
        });

        client
            .current
            .activate();
    };

    const disconnect = () => {
        client
            .current
            .deactivate();
    };

    const subscribe = () => {
        client
            .current
            .subscribe(`/sub/chat/${ROOM_SEQ}`, ({body}) => {
                console.log(body)
                setChatMessages((_chatMessages) => [
                    ..._chatMessages,
                    JSON.parse(body)
                ]);
            });
    };

    const publish = (message) => {
        if (!client.current.connected) {
            return;
        }

        client
            .current
            .publish({
                destination: "/pub/chat",
                body: JSON.stringify({roomSeq: ROOM_SEQ, message, sender: sender})
            });
        setMessage("");
    };

    const token = `Bearer ${useSelector((state) => state.auth.accessToken)}`

    // 테마 설정 세트
    const theme = useSelector((state) => state.theme.themedata)
    const [themeColor, setThemeColor] = useState({})

    useEffect(() => {
        if (theme === "default") {
            setThemeColor(themeDefault)
        } else if (theme === "theme1") {
            setThemeColor(theme1)
        } else if (theme === "theme2") {
            setThemeColor(theme2)
        }
    }, [theme])

    useEffect(() => {
        console.log(chatMessages)
    }, [chatMessages])
    // 테마 설정 세트 끝

    const scrollRef = useRef();
    useEffect(() => {
    	// 현재 스크롤 위치 === scrollRef.current.scrollTop
        // 스크롤 길이 === scrollRef.current.scrollHeight
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[chatMessages])

    const FEEL = `${useSelector((state) => state.auth.feel)}의 방`
    
    return (
        <div
            className="Chat-wrapper"
            style={{
                background: `${themeColor.background}`,
                color: `${themeColor.mycolor}`,
                border: `${themeColor.border}`
            }}>
            <NavBar/>

            <div className="roomName" >
                {FEEL}
            </div>
            
            <div class="chat">
                <div class="chat-title">
                    <h1>{ useSelector((state) => state.auth.feel) }</h1>
                    <h2>{ sender }</h2>
                    {/* <figure class="avatar">
                        <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"/></figure> */
                    }
                </div>
                <div class="messages" ref={scrollRef}>
                    <div class="messages-content mCustomScrollbar _mCS_1 mCS_no_scrollbar">
                        <div
                            id="mCSB_1"
                            className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside">
                            <div
                                id="mCSB_1_container"
                                className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y">
                                {
                                    chatMessages.map((_chatMessage, index) => (
                                            _chatMessage.sender === sender
                                            ? <ChatBubble message={_chatMessage.message}/>
                                            : <ChatBubbleOther message={_chatMessage.message} sender={_chatMessage.sender}/>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-box">
                    <textarea
                        type="text"
                        class="message-input"
                        placeholder="Type message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button type="submit" class="message-submit" onClick={() => publish(message)}>Send</button>
                </div>

            </div>

        </div>
    );
};

export default Home;