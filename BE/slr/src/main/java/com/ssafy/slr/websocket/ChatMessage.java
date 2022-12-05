package com.ssafy.slr.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatMessage {

    // 입장, 채팅, 퇴장
    public enum MessageType {
        ENTER, TALK, QUIT
    }

    private MessageType type;
    private Integer roomSeq;
    private String message;
    private String sender;
    private long userCount;
}

