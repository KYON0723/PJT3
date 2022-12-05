package com.ssafy.slr.websocket;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
@Slf4j
public class ChatRepository {

    private Map<String, ChatMessage> chatMessageMap;

    @PostConstruct
    public void init() {
        chatMessageMap = new HashMap<>();
    }

    public void increaseUser(String roomId) {
        ChatMessage chatMessage = chatMessageMap.get(roomId);
        chatMessage.setUserCount(chatMessage.getUserCount()+1);
    }

    public void decreaseUser(String roomId) {
        ChatMessage chatMessage = chatMessageMap.get(roomId);
        chatMessage.setUserCount(chatMessage.getUserCount()-1);
    }

}
